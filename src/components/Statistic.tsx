import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
const data = [
  {
    name: `Jan '23`,
    visit: 100,
  },
  {
    name: `Feb '23`,
    visit: 200,
  },
  {
    name: `Mar '23`,
    visit: 242,
  },
  {
    name: `Apr '23`,
    visit: 531,
  },
  {
    name: `May '23`,
    visit: 899,
  },
  {
    name: `Jun '23`,
    visit: 992,
  },
]

export default function Statistic() {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Line
          width={20}
          type='monotone'
          dataKey='visit'
          stroke='#319795'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
