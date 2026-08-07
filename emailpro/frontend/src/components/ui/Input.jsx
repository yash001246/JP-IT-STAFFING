import clsx from 'clsx'

export default function Input({ label, error, className, icon, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-white/80">{label}</span>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>}
        <input
          className={clsx(
            'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-muted/70 outline-none transition-all duration-200 focus:border-accent-purple/60 focus:bg-white/8 focus-ring',
            icon && 'pl-10',
            error && 'border-red-500/60',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  )
}
