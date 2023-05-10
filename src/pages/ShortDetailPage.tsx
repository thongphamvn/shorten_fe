import { Box, Heading, useBreakpointValue } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ShortDetail from '../components/ShortDetail'
import ShortDrawer from '../components/ShortDrawer'

export default function ShortDetailPage() {
  const { shortUrl } = useParams()

  const isSmallScreen = useBreakpointValue({ base: true, md: false })

  return isSmallScreen ? (
    <ShortDrawer>
      <ShortDetail shortUrl={shortUrl!} />
    </ShortDrawer>
  ) : (
    <Box bg='white' rounded={'md'}>
      <Box pb={2} mb={4} borderBottomWidth={1} borderBottomColor={'gray.300'}>
        <Heading as={'h3'} fontWeight={'semibold'} fontSize={'xl'}>
          Link Details
        </Heading>
      </Box>

      <ShortDetail shortUrl={shortUrl!} />
    </Box>
  )
}
