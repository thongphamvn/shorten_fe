import { Box, Flex, Select, Text } from '@chakra-ui/react'
import { format, subDays, subHours } from 'date-fns'
import { useMemo, useState } from 'react'
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
import { StatsPeriod, StatsResponse } from '../openapi'

const buildChartData = (period: StatsPeriod, data: StatsResponse[] = []) => {
  if (period === StatsPeriod._24H) {
    return Array.from({ length: 24 }, (_, i) => {
      const currentDate = subHours(new Date(), 23 - i)
      const formattedHour = format(currentDate, 'h a')

      const matchingEntry = data?.find((entry) => {
        const entryDate = new Date(entry.timestamp)
        return format(entryDate, 'h a') === formattedHour
      })

      return { timestamp: formattedHour, count: matchingEntry?.count || 0 }
    })
  }

  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = subDays(new Date(), 6 - i)
    const formattedDate = format(currentDate, 'yyyy-MM-dd')

    const matchingEntry = data?.find((entry) => {
      return entry.timestamp === formattedDate
    })

    return {
      timestamp: format(new Date(formattedDate), 'MMM-dd'),
      count: matchingEntry?.count || 0,
    }
  })
}

export default function Statistics({ shortUrl }: { shortUrl: string }) {
  const [period, setPeriod] = useState<StatsPeriod>(StatsPeriod._24H)

  const { data } = useGetStats(shortUrl, period, {
    initialData: [],
  })

  const result = useMemo(() => buildChartData(period, data), [period, data])

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
            setPeriod(ev.target.value as StatsPeriod)
          }}
        >
          <option value={StatsPeriod._24H}>Last 24h</option>
          <option value={StatsPeriod._7DAYS}>Last 7 days</option>
        </Select>
      </Flex>

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={result}
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
          <Bar type='monotone' dataKey='count' fill='#319795' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
