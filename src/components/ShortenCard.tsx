import { Box, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ShortenUrlType } from '../api/shorten'
import ShortUrl from './ShortUrl'

export default function ShortenCard({ link }: { link: ShortenUrlType }) {
  const { originalUrl, displayName, shortUrl } = link
  const { shortUrl: selectedShort } = useParams()

  return (
    <Link to={`/s/${link.shortUrl}`}>
      <Box
        p={4}
        _hover={{
          shadow: 'md',
        }}
        borderLeft={selectedShort === link.shortUrl ? '4px' : ''}
        borderColor={selectedShort === link.shortUrl ? 'teal.500' : ''}
        bg='white'
      >
        <Text as='h3' fontSize={'lg'} fontWeight={'semibold'}>
          {displayName}
        </Text>
        <ShortUrl short={shortUrl} />
        <Text fontSize={'sm'} fontWeight={'light'} noOfLines={2}>
          {originalUrl}
        </Text>
      </Box>
    </Link>
  )
}
