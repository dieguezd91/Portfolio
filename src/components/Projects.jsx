import { useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';

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

function ProjectCarousel({ title, description, projects: carouselProjects }) {
  const [rotationStep, setRotationStep] = useState(0);
  const [failedMedia, setFailedMedia] = useState({});
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === 'undefined' ? 1024 : window.innerWidth
  );

  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef(null);
  const activeButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCount = carouselProjects?.length ?? 0;
  const carouselSlots = useMemo(
    () => createCarouselSlots(carouselProjects),
    [carouselProjects]
  );
  const slotCount = carouselSlots.length;
  const activeSlotIndex = slotCount > 0 ? wrapIndex(rotationStep, slotCount) : 0;
  const activeIndex =
    slotCount > 0 ? carouselSlots[activeSlotIndex].projectIndex : 0;
  const activeProject = totalCount > 0 ? carouselProjects[activeIndex] : null;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const slideWidth = getSlideWidth(windowWidth);
  const polygonGap = isMobile ? 12 : isTablet ? 18 : 24;
  const { angle: polygonAngle, radius: polygonRadius } = getPolygonGeometry(
    slotCount,
    slideWidth,
    polygonGap
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeButton = activeButtonRef.current;

    if (!container || !activeButton) {
      return;
    }

    const targetLeft =
      activeButton.offsetLeft -
      container.clientWidth / 2 +
      activeButton.clientWidth / 2;

    container.scrollTo({
      left: targetLeft,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex, shouldReduceMotion]);

  if (!activeProject) {
    return null;
  }

  const goToNext = () => {
    if (totalCount > 1) {
      setRotationStep((currentStep) => currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (totalCount > 1) {
      setRotationStep((currentStep) => currentStep - 1);
    }
  };

  const goToProject = (targetIndex) => {
    if (totalCount <= 1 || targetIndex === activeIndex) {
      return;
    }

    setRotationStep((currentStep) => {
      const currentIndex = wrapIndex(currentStep, totalCount);
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

    if (interactiveElement && event.target !== event.currentTarget) {
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

  const swipeOffsetThreshold = 70;
  const swipeVelocityThreshold = 500;

  const handleDragEnd = (_, info) => {
    const shouldGoNext =
      info.offset.x < -swipeOffsetThreshold ||
      info.velocity.x < -swipeVelocityThreshold;

    const shouldGoPrevious =
      info.offset.x > swipeOffsetThreshold ||
      info.velocity.x > swipeVelocityThreshold;

    if (shouldGoNext) {
      goToNext();
    } else if (shouldGoPrevious) {
      goToPrevious();
    }
  };

  const markMediaAsFailed = (projectId) => {
    setFailedMedia((current) => ({
      ...current,
      [projectId]: true,
    }));
  };

  const progressPercent = ((activeIndex + 1) / totalCount) * 100;
  const contributions = activeProject.contributions ?? [];
  const technologyItems = (
    activeProject.technologies ??
    activeProject.tags ??
    []
  ).slice(0, 4);
  const technologyLine = technologyItems.join(' · ');

  let defaultCta = 'View project';

  if (activeProject.storeType === 'googlePlay') {
    defaultCta = 'View on Google Play';
  } else if (activeProject.storeType === 'itch') {
    defaultCta = 'Play on itch.io';
  }

  const actionLabel = activeProject.ctaLabel || defaultCta;

  return (
    <div
      className="mb-20 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} carousel. Use Left and Right Arrow keys to navigate.`}
    >
      <div className="mb-6 border-b border-white/[0.08] pb-4">
        <h3 className="mb-2 font-heading text-2xl font-bold tracking-tight text-white">
          {title}
        </h3>

        {description && (
          <p className="font-body text-sm text-zinc-400">{description}</p>
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
              <span className="text-xl">&larr;</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="project-coverflow__arrow project-coverflow__arrow--next carousel-control-btn z-30 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all duration-150 hover:border-white/30"
              aria-label="Next project"
            >
              <span className="text-xl">&rarr;</span>
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
              rotateY: -rotationStep * polygonAngle,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {carouselSlots.map(({ project, slotIndex }) => {
              const offset = getCircularOffset(
                slotIndex,
                activeSlotIndex,
                slotCount
              );
              const distance = Math.abs(offset);
              const isActive = slotIndex === activeSlotIndex;
              const isInteractive = isActive || distance === 1;
              const hasMediaFailed = Boolean(failedMedia[project.id]);

              const SlideTag = isActive
                ? 'article'
                : isInteractive
                  ? 'button'
                  : 'div';

              const slideProps =
                !isActive && isInteractive
                  ? {
                      type: 'button',
                      onClick: () => goToProject(slotIndex % totalCount),
                      'aria-label': `Go to project: ${project.title}`,
                    }
                  : {};

              return (
                <div
                  key={`${project.id}-${slotIndex}`}
                  className={`coverflow-slide overflow-hidden rounded-xl border border-white/10 bg-zinc-900 ${
                    isActive ? 'shadow-xl' : 'shadow-none'
                  }`}
                  style={{
                    transform: `rotateY(${slotIndex * polygonAngle}deg) translateZ(${polygonRadius}px)`,
                    pointerEvents: isInteractive ? 'auto' : 'none',
                  }}
                  aria-hidden={!isInteractive}
                >
                  <Motion.div
                    className="coverflow-slide__surface h-full w-full"
                    animate={{
                      opacity: getSurfaceOpacity(distance),
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
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
                          drag={isActive && !shouldReduceMotion ? 'x' : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.08}
                          onDragEnd={handleDragEnd}
                          className="h-full w-full"
                          style={{ touchAction: 'pan-y' }}
                        >
                          <img
                            src={project.media}
                            alt={`${project.title} gameplay screenshot`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full select-none pointer-events-none"
                            style={{
                              objectFit: project.mediaFit || 'cover',
                              objectPosition: project.mediaPosition || 'center',
                            }}
                            draggable={false}
                            onError={() => markMediaAsFailed(project.id)}
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
            })}
          </Motion.div>
        </div>
      </div>

      {totalCount > 1 && (
        <div className="mb-6 mt-4 flex items-center justify-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400">
            {formatNumber(activeIndex + 1)} / {formatNumber(totalCount)}
          </span>

          <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#00F5D4] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto mt-2 flex min-h-[150px] w-full max-w-5xl flex-col justify-center gap-4 text-zinc-300">
        <div className="flex flex-col justify-between gap-2 border-b border-white/[0.05] pb-3 md:flex-row md:items-baseline">
          <div>
            <h4 className="font-heading text-xl font-bold leading-tight text-white md:text-2xl">
              {activeProject.title}
            </h4>
            <p className="mt-1 font-body text-xs font-semibold text-[#00F5D4]">
              {activeProject.role}
            </p>
          </div>

          <div className="md:text-right">
            <p className="font-body text-xs font-bold uppercase tracking-wide text-zinc-400 md:text-sm">
              {activeProject.platform} &middot; {activeProject.year}
            </p>
          </div>
        </div>

        <div className="py-1 text-sm leading-relaxed text-zinc-200 md:text-base">
          {activeProject.description}
        </div>

        {contributions.length > 0 && (
          <div className="mt-1 border-t border-white/[0.03] py-2">
            <h5 className="mb-2 font-heading text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Key Technical Contributions
            </h5>

            {isMobile ? (
              <ul className="space-y-1">
                {contributions.slice(0, 3).map((contribution, index) => (
                  <li
                    key={`${activeProject.id}-${index}`}
                    className="flex items-start gap-2 text-xs text-zinc-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00F5D4]" />
                    <span className="leading-relaxed">{contribution}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
                {contributions.join('  ·  ')}
              </p>
            )}
          </div>
        )}

        <div className="mt-1 flex items-center justify-between gap-6 border-t border-white/[0.05] pt-3">
          <p className="font-body text-xs font-medium tracking-wide text-zinc-500">
            {technologyLine}
          </p>

          <a
            href={activeProject.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="carousel-cta-link inline-flex items-center gap-1.5 py-1 text-xs font-semibold text-zinc-200 transition-colors duration-150 hover:text-[#00F5D4] focus:outline-none focus-visible:text-[#00F5D4]"
          >
            <span>{actionLabel}</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {totalCount > 1 && (
        <div
          ref={scrollContainerRef}
          className="scrollbar-none mt-6 flex snap-x gap-4 overflow-x-auto pb-2"
        >
          {carouselProjects.map((project, index) => {
            const isActive = index === activeIndex;
            const hasMediaFailed = Boolean(failedMedia[project.id]);

            return (
              <button
                key={project.id}
                ref={isActive ? activeButtonRef : null}
                type="button"
                onClick={() => goToProject(index)}
                aria-label={`Go to project: ${project.title}`}
                className={`carousel-selector-btn h-[40px] w-[72px] shrink-0 snap-center overflow-hidden rounded border transition-all duration-200 focus:outline-none md:h-[54px] md:w-24 ${
                  isActive
                    ? 'scale-105 border-[#00F5D4] opacity-100'
                    : 'border-white/10 opacity-40 hover:opacity-75'
                }`}
              >
                {hasMediaFailed ? (
                  <div className="flex h-full w-full items-center justify-center truncate bg-zinc-950 p-1 text-[8px] font-semibold text-zinc-600">
                    {project.title}
                  </div>
                ) : (
                  <img
                    src={project.media}
                    alt=""
                    className="h-full w-full select-none object-cover pointer-events-none"
                    style={{
                      objectFit: project.mediaFit || 'cover',
                      objectPosition: project.mediaPosition || 'center',
                    }}
                    onError={() => markMediaAsFailed(project.id)}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const projects3D = projects.filter((project) => project.dimension === '3D');
  const projects2D = projects.filter((project) => project.dimension === '2D');

  return (
    <section id="projects" className="min-h-screen bg-[#14162A] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            Projects
          </h2>

          <Motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mb-6 h-1 bg-[#00F5D4]/50"
          />

          <p className="mx-auto max-w-2xl font-body text-base font-normal leading-relaxed text-zinc-300 md:text-lg">
            Projects and prototypes built during my professional training and indie game development journey.
          </p>
        </Motion.div>

        <ProjectCarousel
          title="3D Projects"
          description="Gameplay systems, AI, VR and interactive 3D experiences."
          projects={projects3D}
        />

        <ProjectCarousel
          title="2D Projects"
          description="Mobile games, deckbuilders, and classic 2D arcade experiences."
          projects={projects2D}
        />
      </div>
    </section>
  );
}