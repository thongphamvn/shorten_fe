import { Card, CardBody, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ShortenUrlType } from '../api/shorten'
import ShortUrl from './ShortUrl'

export default function ShortenCard({ link }: { link: ShortenUrlType }) {
  const { originalUrl, shortUrl } = link

  return (
    <Link to={`/s/${link.shortUrl}`}>
      <Card>
        <CardBody>
          <Text noOfLines={1}>{originalUrl}</Text>
          <ShortUrl short={shortUrl} />
        </CardBody>
      </Card>
    </Link>
  )
}
