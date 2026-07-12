import { useState, useEffect, useRef } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';

function formatNumber(num) {
  return String(num).padStart(2, '0');
}

// Circular index utility helpers
function getPreviousIndex(index, total) {
  return (index - 1 + total) % total;
}

// Circular index utility helpers
function getNextIndex(index, total) {
  return (index + 1) % total;
}

// Pure function returning shortest circular offset
function getCircularOffset(projectIndex, activeIndex, total) {
  let offset = projectIndex - activeIndex;
  const half = total / 2;

  if (offset > half) {
    offset -= total;
  } else if (offset < -half) {
    offset += total;
  }

  // Consistent tie breaker for even collections
  if (offset === half) {
    return half;
  }

  return offset;
}

// Pure function returning orbital Coverflow transformation values.
function getSlideTransform(offset, shouldReduceMotion, isMobile, isTablet) {
  const distance = Math.abs(offset);

  if (offset === 0) {
    return {
      x: 0,
      z: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 20,
    };
  }

  if (shouldReduceMotion) {
    const spacing = isMobile ? 150 : isTablet ? 220 : 280;

    return {
      x: offset * spacing,
      z: 0,
      scale: distance === 1 ? 0.88 : 0.76,
      rotateY: 0,
      opacity: distance === 1 ? 0.5 : 0.22,
      zIndex: 20 - distance,
    };
  }

  const angleStep = isMobile ? 18 : isTablet ? 24 : 30;
  const angleDegrees = offset * angleStep;
  const angleRadians = angleDegrees * (Math.PI / 180);

  const radiusX = isMobile ? 350 : isTablet ? 520 : 720;
  const radiusZ = isMobile ? 120 : isTablet ? 210 : 320;

  return {
    x: Math.sin(angleRadians) * radiusX,
    z: Math.cos(angleRadians) * radiusZ - radiusZ,
    scale: Math.max(1 - distance * 0.14, 0.62),
    rotateY: -angleDegrees,
    opacity: distance === 1 ? 0.68 : 0.26,
    zIndex: 20 - distance,
  };
}

function ProjectCarousel({ title, description, projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [failedThumbnails, setFailedThumbnails] = useState({});
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const shouldReduceMotion = useReducedMotion();
  
  const scrollContainerRef = useRef(null);
  const activeBtnRef = useRef(null);

  // Resize listener to adapt responsive ranges and rotations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Fallback bounds check
  const totalCount = projects ? projects.length : 0;
  const validIndex = totalCount > 0 ? Math.min(activeIndex, totalCount - 1) : 0;
  const activeProject = totalCount > 0 ? projects[validIndex] : null;

  useEffect(() => {
    setImageFailed(false);
  }, [activeProject?.id]);

  // Horizontal auto-scroll of the bottom selector without page jumps
  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeBtn = activeBtnRef.current;
    if (container && activeBtn) {
      const containerWidth = container.clientWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      container.scrollTo({
        left: btnOffsetLeft - containerWidth / 2 + btnWidth / 2,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  }, [validIndex, shouldReduceMotion]);

  if (!projects || totalCount === 0 || !activeProject) {
    return null;
  }

  const goToNext = () => {
    if (totalCount > 1) {
      setActiveIndex(getNextIndex(validIndex, totalCount));
    }
  };

  const goToPrevious = () => {
    if (totalCount > 1) {
      setActiveIndex(getPreviousIndex(validIndex, totalCount));
    }
  };

  const goToProject = (index) => {
    if (index === validIndex) return;
    setActiveIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (event) => {
    const interactiveElement = event.target.closest('a, button, input, textarea, select');
    if (interactiveElement && event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  // Swipe drag gesture config
  const SWIPE_OFFSET_THRESHOLD = 70;
  const SWIPE_VELOCITY_THRESHOLD = 500;

  const handleDragEnd = (_, info) => {
    const shouldGoNext =
      info.offset.x < -SWIPE_OFFSET_THRESHOLD ||
      info.velocity.x < -SWIPE_VELOCITY_THRESHOLD;

    const shouldGoPrevious =
      info.offset.x > SWIPE_OFFSET_THRESHOLD ||
      info.velocity.x > SWIPE_VELOCITY_THRESHOLD;

    if (shouldGoNext) {
      goToNext();
    } else if (shouldGoPrevious) {
      goToPrevious();
    }
  };

  // Filter projects to only render activeIndex ± maxRange
  const maxRange = isMobile || isTablet ? 1 : 2;
  const progressPercent = ((validIndex + 1) / totalCount) * 100;
  const contributions = activeProject.contributions || [];
  const techItems = (activeProject.technologies || activeProject.tags || []).slice(0, 4);
  const techLine = techItems.join(' · ');

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
      aria-label={`${title} coverflow. Use Left and Right Arrow keys to navigate.`}
    >
      {/* Header */}
      <div className="mb-6 border-b border-white/[0.08] pb-4">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-white mb-2">{title}</h3>
        {description && (
          <p className="font-body text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {/* 3D Viewport Area */}
      <div
        className="project-coverflow flex items-center justify-center py-4"
        aria-live="polite"
      >
        {/* Floating Controls wrapper outside active slide area */}
        {totalCount > 1 && (
          <div className="project-coverflow__controls">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={goToPrevious}
              className="project-coverflow__arrow project-coverflow__arrow--previous carousel-control-btn w-[52px] h-[52px] rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-white/30 text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 flex items-center justify-center cursor-pointer shadow-lg z-30"
              aria-label="Previous project"
            >
              <span className="text-xl">&larr;</span>
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={goToNext}
              className="project-coverflow__arrow project-coverflow__arrow--next carousel-control-btn w-[52px] h-[52px] rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-white/30 text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 flex items-center justify-center cursor-pointer shadow-lg z-30"
              aria-label="Next project"
            >
              <span className="text-xl">&rarr;</span>
            </button>
          </div>
        )}

        {/* Slides rendering loop */}
        {projects.map((project, idx) => {
          const offset = getCircularOffset(idx, validIndex, totalCount);
          
          // Explicitly manage neighbor counts for different collection sizes to prevent empty gaps and duplicate visual states
          if (totalCount === 1) {
            if (offset !== 0) return null;
          } else if (totalCount === 2) {
            // Only show 1 neighbor to avoid duplicate representations
            if (offset !== 0) {
              if (validIndex === 0 && offset !== 1) return null;
              if (validIndex === 1 && offset !== -1) return null;
            }
          } else if (totalCount === 3 || totalCount === 4) {
            // Limit rendering window to ±1 to keep visual symmetry and prevent duplicate neighbor cards
            if (Math.abs(offset) > 1) return null;
          } else {
            // 5 or more projects: render full ±2 range
            if (Math.abs(offset) > maxRange) return null;
          }

          const isActive = idx === validIndex;
          const { x, z, scale, rotateY, opacity, zIndex } = getSlideTransform(
            offset,
            shouldReduceMotion,
            isMobile,
            isTablet
          );

          const SlideTag = isActive ? 'article' : 'button';
          const slideProps = isActive
            ? {}
            : {
                type: 'button',
                onClick: () => goToProject(idx),
                'aria-label': `Go to project: ${project.title}`,
              };

          return (
            <Motion.div
              key={project.id}
              className={`coverflow-slide rounded-xl overflow-hidden bg-zinc-900 border border-white/10 ${
                isActive ? 'shadow-xl' : 'shadow-none'
              }`}
              style={{ zIndex, transformOrigin: 'center center' }}
              animate={{
                x,
                scale,
                opacity,
                rotateY,
                z,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <SlideTag
                {...slideProps}
                className="group w-full h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5D4] text-left block"
              >
                {/* Fallback image check */}
                {isActive && imageFailed ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950">
                    <span className="font-heading text-lg font-bold text-white mb-2">{project.title}</span>
                    <span className="text-zinc-500 text-xs">Screenshot unavailable</span>
                  </div>
                ) : (
                  <Motion.div
                    drag={isActive && !shouldReduceMotion ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="w-full h-full"
                    style={{ touchAction: 'pan-y' }}
                  >
                    <img
                      src={project.media}
                      alt={`${project.title} gameplay screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full pointer-events-none select-none"
                      style={{
                        objectFit: project.mediaFit || 'cover',
                        objectPosition: project.mediaPosition || 'center',
                      }}
                      draggable={false}
                      onError={isActive ? () => setImageFailed(true) : undefined}
                    />
                  </Motion.div>
                )}

                {/* Dark overlay for neighbor slides */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-200 group-hover:bg-black/25" />
                )}
              </SlideTag>
            </Motion.div>
          );
        })}
      </div>

      {/* Progress Line Bar & Counter */}
      {totalCount > 1 && (
        <div className="mt-4 mb-6 flex items-center justify-center gap-4">
          <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider">
            {formatNumber(validIndex + 1)} / {formatNumber(totalCount)}
          </span>
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00F5D4] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Lower Active Project Information panel (Compact semantic hierarchy) */}
      <div className="w-full max-w-5xl mx-auto text-zinc-300 mt-2 min-h-[150px] flex flex-col justify-center gap-4">
        {/* Row 1 & 2: Title, platform/year, developer role */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-white/[0.05] pb-3">
          <div>
            <h4 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight">
              {activeProject.title}
            </h4>
            <p className="font-body text-xs text-[#00F5D4] font-semibold mt-1">
              {activeProject.role}
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-body text-xs md:text-sm text-zinc-400 font-bold tracking-wide uppercase">
              {activeProject.platform} &middot; {activeProject.year}
            </p>
          </div>
        </div>

        {/* Row 3: Public Description */}
        <div className="text-zinc-200 text-sm md:text-base leading-relaxed py-1">
          {activeProject.description}
        </div>

        {/* Row 4: Technical Contributions */}
        {contributions.length > 0 && (
          <div className="py-2 border-t border-white/[0.03] mt-1">
            <h5 className="font-heading text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-2">
              Key Technical Contributions
            </h5>
            {isMobile ? (
              <ul className="space-y-1">
                {contributions.slice(0, 3).map((contribution, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00F5D4]" />
                    <span className="leading-relaxed">{contribution}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                {contributions.join('  ·  ')}
              </p>
            )}
          </div>
        )}

        {/* Row 5: Technologies & CTA */}
        <div className="flex items-center justify-between gap-6 border-t border-white/[0.05] pt-3 mt-1">
          <p className="font-body text-xs text-zinc-500 font-medium tracking-wide">
            {techLine}
          </p>
          <a
            href={activeProject.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="carousel-cta-link inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-[#00F5D4] focus-visible:text-[#00F5D4] focus:outline-none transition-colors duration-150 py-1"
          >
            <span>{actionLabel}</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {/* Selector with Miniatures */}
      {totalCount > 1 && (
        <div
          ref={scrollContainerRef}
          className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x"
        >
          {projects.map((proj, idx) => {
            const isActive = idx === validIndex;
            const hasThumbFailed = failedThumbnails[proj.id];

            return (
              <button
                key={proj.id}
                ref={isActive ? activeBtnRef : null}
                onClick={() => goToProject(idx)}
                aria-label={`Go to project: ${proj.title}`}
                className={`carousel-selector-btn rounded overflow-hidden aspect-video transition-all duration-200 shrink-0 snap-center focus:outline-none border ${
                  isActive
                    ? 'border-[#00F5D4] opacity-100 scale-105'
                    : 'border-white/10 opacity-40 hover:opacity-75'
                } w-[72px] h-[40px] md:w-24 md:h-[54px]`}
              >
                {hasThumbFailed ? (
                  <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-[8px] text-zinc-600 font-semibold truncate p-1">
                    {proj.title}
                  </div>
                ) : (
                  <img
                    src={proj.media}
                    alt=""
                    className="w-full h-full object-cover pointer-events-none select-none"
                    style={{
                      objectFit: proj.mediaFit || 'cover',
                      objectPosition: proj.mediaPosition || 'center',
                    }}
                    onError={() => {
                      setFailedThumbnails((prev) => ({ ...prev, [proj.id]: true }));
                    }}
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
    <section id="projects" className="min-h-screen bg-[#14162A] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-white">
            Projects
          </h2>
          <Motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="h-1 bg-[#00F5D4]/50 mx-auto mb-6"
          />
          <p className="font-body font-normal text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Projects and prototypes built during my professional training and indie game development journey.
          </p>
        </Motion.div>

        {/* 3D Projects Coverflow */}
        <ProjectCarousel
          title="3D Projects"
          description="Gameplay systems, AI, VR and interactive 3D experiences."
          projects={projects3D}
        />

        {/* 2D Projects Coverflow */}
        <ProjectCarousel
          title="2D Projects"
          description="Mobile games, deckbuilders, and classic 2D arcade experiences."
          projects={projects2D}
        />
      </div>
    </section>
  );
}