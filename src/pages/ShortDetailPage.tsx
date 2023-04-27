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
    <Box minH={500} p={4} bg='white' rounded={'md'}>
      <Heading mb={4} as={'h3'} fontWeight={'semibold'} fontSize={'xl'}>
        Link Details
      </Heading>

      <ShortDetail shortUrl={shortUrl!} />
    </Box>
  )
}
