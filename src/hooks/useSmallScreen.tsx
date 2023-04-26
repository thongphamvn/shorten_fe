import { useBreakpointValue } from '@chakra-ui/react'

export const useSmallScreen = () => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  return { isSmallScreen }
}
