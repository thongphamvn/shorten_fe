import { Box, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ShortenUrlType } from '../api/shorten'
import ShortUrl from './ShortUrl'

export default function ShortenCard({ link }: { link: ShortenUrlType }) {
  const { originalUrl, shortUrl } = link
  const { shortUrl: selectedShort } = useParams()

  return (
    <Link to={`/s/${link.shortUrl}`}>
      <Box
        shadow={'sm'}
        p={4}
        _hover={{
          shadow: 'md',
        }}
        rounded={'md'}
        bg={selectedShort === link.shortUrl ? 'teal.50' : 'white'}
      >
        <Text noOfLines={1}>{originalUrl}</Text>
        <ShortUrl short={shortUrl} />
      </Box>
    </Link>
  )
}
