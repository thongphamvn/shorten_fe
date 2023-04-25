import { Card, CardBody, Text } from '@chakra-ui/react'
import { ShortenResponse } from '@common'
import ShortUrl from './ShortUrl'

export default function ShortenCard({ link }: { link: ShortenResponse }) {
  const { originalUrl, shortUrl } = link

  return (
    <Card>
      <CardBody>
        <Text noOfLines={1}>{originalUrl}</Text>
        <ShortUrl short={shortUrl} />
      </CardBody>
    </Card>
  )
}
