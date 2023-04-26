import { Box, Heading, useBreakpointValue } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSingleOneShort } from '../api/shorten'
import ShortDetail from '../components/ShortDetail'
import ShortDrawer from '../components/ShortDrawer'

export default function ShortDetailPage() {
  const { shortUrl } = useParams()

  const { data } = useSingleOneShort(shortUrl!, {
    enabled: !!shortUrl,
    onError: () => {
      console.log('error')
    },
  })

  const isSmallScreen = useBreakpointValue({ base: true, md: false })

  if (!data) {
    return null
  }

  if (!shortUrl) {
    return <Box>404</Box>
  }

  return isSmallScreen ? (
    <ShortDrawer>
      <ShortDetail short={data} />
    </ShortDrawer>
  ) : (
    <Box p={4} bg='white' rounded={'md'}>
      <Heading mb={4} as={'h3'} fontWeight={'semibold'} fontSize={'xl'}>
        Link Details
      </Heading>
      <ShortDetail short={data} />
    </Box>
  )
}
