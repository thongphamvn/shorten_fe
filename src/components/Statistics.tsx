import { Box, Flex, Select, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useGetStats } from '../api/shorten'

export default function Statistics({ shortUrl }: { shortUrl: string }) {
  const [period, setPeriod] = useState<'24h' | '7days'>('24h')

  const { data } = useGetStats(shortUrl, period, {
    initialData: [],
  })

  const transformed =
    period === '24h'
      ? data?.map((d) => ({
          ...d,
          timestamp: format(new Date(d.timestamp), 'hh a'),
        }))
      : data

  return (
    <Box height={'300px'}>
      <Flex justify={'space-between'} align={'center'}>
        <Text mr={2} as={'h3'} fontSize={'xl'} fontWeight={'semibold'}>
          Statistics
        </Text>
        <Select
          rounded={4}
          colorScheme='teal'
          width={150}
          size={'sm'}
          value={period}
          onChange={(ev) => {
            setPeriod(ev.target.value as '24h' | '7days')
          }}
        >
          <option value='24h'>Last 24h</option>
          <option value='7days'>Last 7 days</option>
        </Select>
      </Flex>

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={transformed}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar type='monotone' barSize={20} dataKey='count' fill='#319795' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
