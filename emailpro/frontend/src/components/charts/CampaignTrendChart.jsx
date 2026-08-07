import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

export default function CampaignTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="week" stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: '#12141F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#8B90A6' }} />
        <Line type="monotone" dataKey="opened" stroke="#7C5CFF" strokeWidth={2.5} dot={{ r: 3 }} name="Opened" />
        <Line type="monotone" dataKey="clicked" stroke="#31D9E8" strokeWidth={2.5} dot={{ r: 3 }} name="Clicked" />
      </LineChart>
    </ResponsiveContainer>
  )
}
