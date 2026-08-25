import { motion, useReducedMotion } from 'framer-motion';

/**
 * The page's one motion grammar.
 *
 * Content is visible by default and rises a short distance on entry with an
 * exponential ease-out. Nothing scales, nothing fades from zero, and nothing
 * repeats on re-scroll. Under `prefers-reduced-motion` the element simply
 * renders in place.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  distance = 14,
  className = '',
  children,
  ...props
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
