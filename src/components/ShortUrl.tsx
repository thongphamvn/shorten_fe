import { Text } from '@chakra-ui/react'

export default function ShortUrl({ short }: { short: string }) {
  const url = new URL(import.meta.env.VITE_API_SERVER_URL)

  return (
    <Text color={'teal.700'} colorScheme='teal' fontSize={'sm'}>
      {url.host + '/'}
      <Text
        as={'span'}
        fontSize={'md'}
        fontWeight={'semibold'}
        color={'teal.700'}
      >
        {short}
      </Text>
    </Text>
  )
}
