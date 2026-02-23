import { motion } from 'framer-motion';

/**
 * HudButton — polymorphic interactive element.
 *
 * Variants
 *   'outline'  (default)  cyan border, transparent bg  → .hud-btn
 *   'primary'             pink solid fill              → .hud-btn-primary
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
  const variantClass = variant === 'primary' ? 'hud-btn-primary' : 'hud-btn';
  const classes = `${variantClass} font-bold flex items-center justify-center gap-2 ${className}`.trim();

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
