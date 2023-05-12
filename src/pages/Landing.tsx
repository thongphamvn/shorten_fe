import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react'

export default function Landing() {
  const { loginWithPopup } = useAuth0()

  const handleLogin = () => {
    loginWithPopup()
  }

  return (
    <Box h={'100vh'} bgColor={'white'}>
      <Container mx={'auto'} maxW={'container.sm'}>
        <Flex
          height={'full'}
          direction={'column'}
          alignItems={'center'}
          pt={24}
        >
          <Image src='short.svg' alt='short' mx={'auto'} h={24} />

          <Text
            as={'h1'}
            mx={'auto'}
            fontWeight={'semibold'}
            fontSize={24}
            mb={8}
          >
            Simple and fast URL shortener!
          </Text>

          <Text>
            <Text as='span' fontWeight={'semibold'}>
              Short.
            </Text>{' '}
            provides the ability to condense lengthy URLs from any websites.
          </Text>
          <Text mt={2}>
            You can shorten links, customize the shortname, and even see how
            many times a link has been clicked.
          </Text>

          <Button
            width={'full'}
            maxW={'md'}
            onClick={handleLogin}
            mt={4}
            variant={'solid'}
            colorScheme='teal'
          >
            Signin with Auth0
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
