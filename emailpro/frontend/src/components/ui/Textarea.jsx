export default function Textarea({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-white/80">{label}</span>}
      <textarea
        className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-muted/70 outline-none transition-all duration-200 focus:border-accent-purple/60 focus:bg-white/8 focus-ring ${className}`}
        {...props}
      />
    </label>
  )
}
