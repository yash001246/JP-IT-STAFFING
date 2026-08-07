export default function FunnelBars({ data }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.stage}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-white/80">{d.stage}</span>
            <span className="font-mono text-muted">{d.value.toLocaleString()}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/6">
            <div
              className="h-2.5 rounded-full bg-grad-primary transition-all duration-700"
              style={{ width: `${(d.value / max) * 100}%`, opacity: 1 - i * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
