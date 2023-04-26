import { Text } from '@chakra-ui/react'

export default function ShortUrl({ short }: { short: string }) {
  const host = window.location.host

  return (
    <Text color={'teal.700'} colorScheme='teal' fontSize={'sm'}>
      {`${host}/`}
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
