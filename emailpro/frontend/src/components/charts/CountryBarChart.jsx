import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

export default function CountryBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
        <XAxis type="number" stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis dataKey="country" type="category" stroke="#8B90A6" fontSize={12} tickLine={false} axisLine={false} width={100} />
        <Tooltip contentStyle={{ background: '#12141F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="opens" radius={[0, 8, 8, 0]}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
