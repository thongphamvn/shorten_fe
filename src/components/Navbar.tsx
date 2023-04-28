import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Flex, Image, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'

export default function Navbar() {
  const { isAuthenticated, loginWithPopup } = useAuth0()

  const handleLogin = () => {
    loginWithPopup()
  }

  return (
    <Box position={'sticky'} top={0} zIndex={'10'} bg='white'>
      <Flex
        px={4}
        mx={'auto'}
        h='12'
        justifyContent='center'
        alignItems='center'
        maxW={'5xl'}
      >
        <Link to={'/'}>
          <Image h={10} src='short.svg' />
        </Link>

        <Spacer />
        <Box>
          {!isAuthenticated ? (
            <Button bg={'teal.500'} textColor={'white'} onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <NavMenu />
          )}
        </Box>
      </Flex>
    </Box>
  )
}
