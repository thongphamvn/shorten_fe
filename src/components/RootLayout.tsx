import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <Box h='100vh' bg='gray.50'>
      <Navbar />

      <Box h='calc(100vh - 3rem)'>
        <Outlet />
      </Box>
    </Box>
  )
}
