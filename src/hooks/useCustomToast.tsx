import { Box, Flex, Text, UseToastOptions, useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()

  const customToast = (
    opts: UseToastOptions & {
      status: 'success' | 'error'
    }
  ) => {
    toast({
      duration: 3000,
      isClosable: true,
      position: 'top-right',
      render: () => (
        <Box
          borderLeft={'4px'}
          borderLeftColor={opts.status === 'success' ? 'teal.500' : 'red.500'}
          mt={12}
          p={2}
          color='gray.600'
          bg={'white'}
          rounded='sm'
          shadow='md'
        >
          <Flex align={'center'}>
            <Box>
              <Text fontWeight='semibold'>{opts.title}</Text>
              <Text fontSize='sm'>{opts.description}</Text>
            </Box>
          </Flex>
        </Box>
      ),
      ...opts,
    })
  }

  return customToast
}
