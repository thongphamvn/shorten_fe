import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Statistics({
  data,
}: {
  data: { month: string; visit: number }[]
}) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar type='monotone' barSize={30} dataKey='visit' fill='#319795' />
      </BarChart>
    </ResponsiveContainer>
  )
}
