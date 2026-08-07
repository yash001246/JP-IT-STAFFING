import clsx from 'clsx'

const variants = {
  primary: 'bg-grad-primary text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5',
  secondary: 'glass text-white hover:bg-white/10 hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-white hover:bg-white/5',
  outline: 'border border-white/15 text-white hover:border-accent-purple/60 hover:bg-white/5',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus-ring disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
