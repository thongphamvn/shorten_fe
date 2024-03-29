import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <Box height={'calc(100vh - 3rem)'}>
      <Navbar />
      <Box h={'full'}>
        <Outlet />
      </Box>
    </Box>
  )
}
