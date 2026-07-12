import { useEffect, useMemo, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';

const FEATURED_PROJECT_IDS = [10, 11, 2];

function formatNumber(value) {
  return String(value).padStart(2, '0');
}

function wrapIndex(value, total) {
  if (total <= 0) {
    return 0;
  }

  return ((value % total) + total) % total;
}

function getCircularOffset(projectIndex, activeIndex, total) {
  if (total <= 0) {
    return 0;
  }

  let offset = projectIndex - activeIndex;
  const half = total / 2;

  if (offset > half) {
    offset -= total;
  } else if (offset < -half) {
    offset += total;
  }

  return offset;
}

function getSlideWidth(windowWidth) {
  if (windowWidth < 768) {
    return windowWidth * 0.8;
  }

  if (windowWidth < 1024) {
    return windowWidth * 0.66;
  }

  return Math.min(windowWidth * 0.5, 700);
}

function getRingRepeatCount(projectCount) {
  if (projectCount <= 1 || projectCount >= 5) {
    return 1;
  }

  const minimumFaceCount = 8;

  return Math.ceil(minimumFaceCount / projectCount);
}

function createCarouselSlots(carouselProjects) {
  const projectCount = carouselProjects?.length ?? 0;

  if (projectCount === 0) {
    return [];
  }

  const repeatCount = getRingRepeatCount(projectCount);
  const slotCount = projectCount * repeatCount;

  return Array.from({ length: slotCount }, (_, slotIndex) => {
    const projectIndex = slotIndex % projectCount;

    return {
      slotIndex,
      projectIndex,
      project: carouselProjects[projectIndex],
    };
  });
}

function getPolygonGeometry(total, slideWidth, gap) {
  if (total <= 1) {
    return {
      angle: 0,
      radius: 0,
    };
  }

  if (total === 2) {
    return {
      angle: 180,
      radius: slideWidth * 0.55 + gap,
    };
  }

  return {
    angle: 360 / total,
    radius: (slideWidth + gap) / (2 * Math.tan(Math.PI / total)),
  };
}

function getSurfaceOpacity(distance) {
  if (distance === 0) {
    return 1;
  }

  if (distance === 1) {
    return 0.72;
  }

  if (distance === 2) {
    return 0.38;
  }

  return 0.16;
}

function getProjectActionLabel(project) {
  if (project.storeType === 'googlePlay') {
    return 'View on Google Play';
  }

  if (project.storeType === 'itch') {
    return 'Play on itch.io';
  }

  return project.ctaLabel || 'View project';
}

function ProjectCarousel({
  title,
  description,
  projects: carouselProjects,
}) {
  const [rotationStep, setRotationStep] = useState(0);
  const [failedMedia, setFailedMedia] = useState({});
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === 'undefined' ? 1024 : window.innerWidth
  );

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalCount = carouselProjects?.length ?? 0;

  const carouselSlots = useMemo(
    () => createCarouselSlots(carouselProjects),
    [carouselProjects]
  );

  const slotCount = carouselSlots.length;

  const activeSlotIndex =
    slotCount > 0
      ? wrapIndex(rotationStep, slotCount)
      : 0;

  const activeIndex =
    slotCount > 0
      ? carouselSlots[activeSlotIndex].projectIndex
      : 0;

  const activeProject =
    totalCount > 0
      ? carouselProjects[activeIndex]
      : null;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const slideWidth = getSlideWidth(windowWidth);
  const polygonGap = isMobile ? 12 : isTablet ? 18 : 24;

  const {
    angle: polygonAngle,
    radius: polygonRadius,
  } = getPolygonGeometry(
    slotCount,
    slideWidth,
    polygonGap
  );

  if (!activeProject) {
    return null;
  }

  const goToNext = () => {
    if (totalCount <= 1) {
      return;
    }

    setRotationStep((currentStep) => currentStep + 1);
  };

  const goToPrevious = () => {
    if (totalCount <= 1) {
      return;
    }

    setRotationStep((currentStep) => currentStep - 1);
  };

  const goToProject = (targetIndex) => {
    if (
      totalCount <= 1 ||
      targetIndex === activeIndex
    ) {
      return;
    }

    setRotationStep((currentStep) => {
      const currentIndex = wrapIndex(
        currentStep,
        totalCount
      );

      let delta = targetIndex - currentIndex;
      const half = totalCount / 2;

      if (delta > half) {
        delta -= totalCount;
      } else if (delta < -half) {
        delta += totalCount;
      }

      return currentStep + delta;
    });
  };

  const handleKeyDown = (event) => {
    const interactiveElement = event.target.closest(
      'a, button, input, textarea, select'
    );

    if (
      interactiveElement &&
      event.target !== event.currentTarget
    ) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const handleDragEnd = (_, info) => {
    const swipeOffsetThreshold = 70;
    const swipeVelocityThreshold = 500;

    const shouldGoNext =
      info.offset.x < -swipeOffsetThreshold ||
      info.velocity.x < -swipeVelocityThreshold;

    const shouldGoPrevious =
      info.offset.x > swipeOffsetThreshold ||
      info.velocity.x > swipeVelocityThreshold;

    if (shouldGoNext) {
      goToNext();
      return;
    }

    if (shouldGoPrevious) {
      goToPrevious();
    }
  };

  const markMediaAsFailed = (projectId) => {
    setFailedMedia((current) => ({
      ...current,
      [projectId]: true,
    }));
  };

  const progressPercent =
    ((activeIndex + 1) / totalCount) * 100;

  const contributions =
    activeProject.contributions ?? [];

  const technologyItems = (
    activeProject.technologies ??
    activeProject.tags ??
    []
  ).slice(0, 4);

  const actionLabel =
    getProjectActionLabel(activeProject);

  return (
    <div
      className="mb-20 min-w-0 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} carousel. Use Left and Right Arrow keys to navigate.`}
    >
      <div className="mb-6 border-b border-white/[0.08] pb-4">
        <h3 className="mb-2 font-heading text-2xl font-bold tracking-tight text-white">
          {title}
        </h3>

        {description && (
          <p className="font-body text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>

      <div
        className="project-coverflow flex items-center justify-center py-4"
        aria-live="polite"
      >
        {totalCount > 1 && (
          <div className="project-coverflow__controls">
            <button
              type="button"
              onClick={goToPrevious}
              className="project-coverflow__arrow project-coverflow__arrow--previous carousel-control-btn z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all duration-150 hover:border-white/30"
              aria-label="Previous project"
            >
              <span className="text-xl">
                &larr;
              </span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="project-coverflow__arrow project-coverflow__arrow--next carousel-control-btn z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all duration-150 hover:border-white/30"
              aria-label="Next project"
            >
              <span className="text-xl">
                &rarr;
              </span>
            </button>
          </div>
        )}

        <div
          className="project-coverflow__depth"
          style={{
            transform: `translateZ(-${polygonRadius}px)`,
          }}
        >
          <Motion.div
            className="project-coverflow__rotor"
            animate={{
              rotateY:
                -rotationStep * polygonAngle,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {carouselSlots.map(
              ({
                project,
                projectIndex,
                slotIndex,
              }) => {
                const offset =
                  getCircularOffset(
                    slotIndex,
                    activeSlotIndex,
                    slotCount
                  );

                const distance =
                  Math.abs(offset);

                const isActive =
                  slotIndex === activeSlotIndex;

                const isInteractive =
                  isActive || distance === 1;

                const hasMediaFailed =
                  Boolean(
                    failedMedia[project.id]
                  );

                let SlideTag = 'div';

                if (isActive) {
                  SlideTag = 'article';
                } else if (isInteractive) {
                  SlideTag = 'button';
                }

                const slideProps =
                  !isActive && isInteractive
                    ? {
                        type: 'button',
                        onClick: () =>
                          goToProject(
                            projectIndex
                          ),
                        'aria-label': `Go to project: ${project.title}`,
                      }
                    : {};

                return (
                  <div
                    key={`${project.id}-${slotIndex}`}
                    className={`coverflow-slide overflow-hidden rounded-xl border border-white/10 bg-zinc-900 ${
                      isActive
                        ? 'shadow-xl'
                        : 'shadow-none'
                    }`}
                    style={{
                      transform: `rotateY(${slotIndex * polygonAngle}deg) translateZ(${polygonRadius}px)`,
                      pointerEvents:
                        isInteractive
                          ? 'auto'
                          : 'none',
                    }}
                    aria-hidden={!isInteractive}
                  >
                    <Motion.div
                      className="coverflow-slide__surface h-full w-full"
                      animate={{
                        opacity:
                          getSurfaceOpacity(
                            distance
                          ),
                      }}
                      transition={{
                        duration:
                          shouldReduceMotion
                            ? 0
                            : 0.35,
                        ease: 'easeOut',
                      }}
                    >
                      <SlideTag
                        {...slideProps}
                        className="group relative block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5D4]"
                      >
                        {hasMediaFailed ? (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-950 p-6 text-center">
                            <span className="mb-2 font-heading text-lg font-bold text-white">
                              {project.title}
                            </span>

                            <span className="text-xs text-zinc-500">
                              Screenshot unavailable
                            </span>
                          </div>
                        ) : (
                          <Motion.div
                            drag={
                              isActive &&
                              !shouldReduceMotion
                                ? 'x'
                                : false
                            }
                            dragConstraints={{
                              left: 0,
                              right: 0,
                            }}
                            dragElastic={0.08}
                            onDragEnd={
                              handleDragEnd
                            }
                            className="h-full w-full"
                            style={{
                              touchAction:
                                'pan-y',
                            }}
                          >
                            <img
                              src={project.media}
                              alt={`${project.title} gameplay screenshot`}
                              loading="lazy"
                              decoding="async"
                              className="pointer-events-none h-full w-full select-none"
                              style={{
                                objectFit:
                                  project.mediaFit ||
                                  'cover',
                                objectPosition:
                                  project.mediaPosition ||
                                  'center',
                              }}
                              draggable={false}
                              onError={() =>
                                markMediaAsFailed(
                                  project.id
                                )
                              }
                            />
                          </Motion.div>
                        )}

                        {!isActive && (
                          <div className="absolute inset-0 bg-black/45 transition-colors duration-200 group-hover:bg-black/25" />
                        )}
                      </SlideTag>
                    </Motion.div>
                  </div>
                );
              }
            )}
          </Motion.div>
        </div>
      </div>

      {totalCount > 1 && (
        <div className="mb-6 mt-4 flex items-center justify-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400">
            {formatNumber(activeIndex + 1)}
            {' / '}
            {formatNumber(totalCount)}
          </span>

          <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#00F5D4] transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto mt-2 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
        <div className="p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="min-w-0">
              <h4 className="font-heading text-xl font-bold leading-tight text-white md:text-2xl">
                {activeProject.title}
              </h4>

              <p className="mt-1 font-body text-xs font-semibold text-[#00F5D4]">
                {activeProject.role}
              </p>
            </div>

            <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              {activeProject.platform}
              {' · '}
              {activeProject.year}
            </p>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-200 md:text-base">
            {activeProject.description}
          </p>

          {contributions.length > 0 && (
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <h5 className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Key Technical Contributions
              </h5>

              <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                {contributions
                  .slice(0, 4)
                  .map(
                    (
                      contribution,
                      index
                    ) => (
                      <li
                        key={`${activeProject.id}-${index}`}
                        className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400 md:text-sm"
                      >
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#00F5D4]" />

                        <span>
                          {contribution}
                        </span>
                      </li>
                    )
                  )}
              </ul>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap gap-2">
              {technologyItems.map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-white/[0.07] bg-black/10 px-2.5 py-1 font-mono text-[10px] font-medium text-zinc-500"
                  >
                    {technology}
                  </span>
                )
              )}
            </div>

            <a
              href={activeProject.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="carousel-cta-link inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#00F5D4]/40 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors duration-150 hover:border-[#00F5D4] hover:text-[#00F5D4] focus:outline-none"
            >
              <span>{actionLabel}</span>

              <span aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      {totalCount > 1 && (
        <nav
          className="mx-auto mt-4 w-full max-w-5xl overflow-hidden"
          aria-label={`${title} project selector`}
        >
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {carouselProjects.map(
              (project, index) => {
                const isActive =
                  index === activeIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() =>
                      goToProject(index)
                    }
                    aria-current={
                      isActive
                        ? 'true'
                        : undefined
                    }
                    aria-label={`Go to project: ${project.title}`}
                    className={`carousel-selector-btn relative flex min-w-0 items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 text-left transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'border-white/[0.14] bg-white/[0.06] text-white'
                        : 'border-transparent bg-transparent text-zinc-500 hover:border-white/[0.07] hover:bg-white/[0.025] hover:text-zinc-300'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        isActive
                          ? 'bg-[#00F5D4]'
                          : 'bg-white/15'
                      }`}
                    />

                    <span className="shrink-0 font-mono text-[10px] font-semibold text-zinc-600">
                      {formatNumber(
                        index + 1
                      )}
                    </span>

                    <span className="min-w-0 truncate font-heading text-xs font-semibold">
                      {project.title}
                    </span>

                    {isActive && (
                      <span className="absolute inset-x-4 bottom-0 h-px bg-[#00F5D4]" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      className="mb-10 text-center"
    >
      <h2 className="mb-4 font-heading text-3xl font-semibold text-white md:text-4xl">
        {title}
      </h2>

      <Motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: 'easeOut',
        }}
        className="mx-auto h-1 bg-[#00F5D4]/50"
      />
    </Motion.div>
  );
}

export default function Projects() {
  const featuredProjects = FEATURED_PROJECT_IDS
    .map((projectId) =>
      projects.find((project) => project.id === projectId)
    )
    .filter(Boolean);

  const featuredProjectIds = new Set(FEATURED_PROJECT_IDS);

  const remainingProjects = projects.filter(
    (project) => !featuredProjectIds.has(project.id)
  );

  const projects3D = remainingProjects.filter(
    (project) => project.dimension === '3D'
  );

  const projects2D = remainingProjects.filter(
    (project) => project.dimension === '2D'
  );

  return (
    <section
      id="projects"
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#14162A] px-6 py-20 text-white"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            Selected Work
          </h2>

          <Motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: 'easeOut',
            }}
            className="mx-auto mb-6 h-1 bg-[#00F5D4]/50"
          />

          <p className="mx-auto max-w-2xl font-body text-base font-normal leading-relaxed text-zinc-300 md:text-lg">
            A selection of game projects showcasing my work in Unity,
            gameplay programming, and systems implementation.
          </p>
        </Motion.div>

        <ProjectCarousel
          title="Featured Projects"
          description="Projects that best represent my current work."
          projects={featuredProjects}
        />

        <SectionHeading title="More Projects" />

        <ProjectCarousel
          title="3D Projects"
          projects={projects3D}
        />

        <ProjectCarousel
          title="2D Projects"
          projects={projects2D}
        />
      </div>
    </section>
  );
}