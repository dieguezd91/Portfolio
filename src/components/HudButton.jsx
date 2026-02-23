import { motion } from 'framer-motion';

/**
 * HudButton — polymorphic interactive element.
 *
 * Variants
 *   'outline'  (default)  cyan border, no glow at rest → .hud-btn        (Level 2)
 *   'solid'               cyan solid fill, ambient glow → .hud-btn-solid  (Level 1)
 *   'primary'             pink solid fill              → .hud-btn-primary (reserved)
 *
 * Element
 *   Renders as <motion.a>      when `href` is provided.
 *   Renders as <motion.button> otherwise.
 *
 * Sizing, padding, and rounding are caller-supplied via `className`.
 * Motion interaction (hover lift + tap scale) is standardised internally.
 */
export default function HudButton({
  variant   = 'outline',
  href,
  download,
  className = '',
  children,
  ...props
}) {
  const variantClass =
    variant === 'solid'   ? 'hud-btn-solid' :
    variant === 'primary' ? 'hud-btn-primary' :
                            'hud-btn';
  const classes = `${variantClass} font-heading font-semibold flex items-center justify-center gap-2 ${className}`.trim();

  const motion_props = {
    whileHover: { y: -2 },
    whileTap:   { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} download={download} className={classes} {...motion_props} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} {...motion_props} {...props}>
      {children}
    </motion.button>
  );
}
