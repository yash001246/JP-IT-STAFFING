import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function DeliveryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#31D9E8" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#31D9E8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="day" stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: '#12141F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: '#fff' }}
        />
        <Area type="monotone" dataKey="sent" stroke="#7C5CFF" strokeWidth={2} fill="url(#sentGrad)" />
        <Area type="monotone" dataKey="opened" stroke="#31D9E8" strokeWidth={2} fill="url(#openGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
