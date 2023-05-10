import { Box, Flex, Image, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'

export default function Navbar() {
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
          <Image h={10} src='/short.svg' />
        </Link>

        <Spacer />
        <Box>
          <NavMenu />
        </Box>
      </Flex>
    </Box>
  )
}
