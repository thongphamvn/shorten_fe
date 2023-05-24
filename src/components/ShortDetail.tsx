import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import { useGetShort } from '../api/shorten'
import ShortDetailHeader from './ShortDetailHeader'
import Statistics from './Statistics'

export default function ShortDetail({ shortUrl }: { shortUrl: string }) {
  const {
    data: short,
    isFetching,
    error,
  } = useGetShort(shortUrl, {
    enabled: !!shortUrl,
    refetchOnWindowFocus: false,
  })

  if (error) {
    return <Box>Something went wrong</Box>
  }

  if (isFetching || !short) {
    return (
      <Flex gap={4} direction={'column'} w='100%'>
        <Skeleton h={20} />
        <Skeleton h={20} />
        <Skeleton h={20} />
      </Flex>
    )
  }

  return (
    <Box flex={1}>
      <ShortDetailHeader short={short} />

      <Box py={1} mt={8}>
        <Text as={'h3'} fontSize={'xl'} fontWeight={'semibold'}>
          Original URL
        </Text>
        <Text wordBreak={'break-word'} width={['100%']} fontStyle={'italic'}>
          {short.originalUrl}
        </Text>
      </Box>

      <Box mt={8}>
        <Text as={'h3'} fontSize={'xl'} fontWeight={'semibold'}>
          Total visits: {short.totalClicks}
        </Text>
      </Box>

      <Box mt={8}>
        <Statistics shortUrl={short.shortUrl} />
      </Box>
    </Box>
  )
}
