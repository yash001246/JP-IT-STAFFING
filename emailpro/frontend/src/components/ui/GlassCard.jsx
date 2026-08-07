import clsx from 'clsx'

export default function GlassCard({ children, className, strong = false, hover = false, ...props }) {
  return (
    <div
      className={clsx(
        strong ? 'glass-strong' : 'glass',
        'rounded-2xl shadow-glass',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/40 hover:shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
