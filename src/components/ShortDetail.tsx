import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { GetShortDetailsResponse, useDeleteShort } from '../api/shorten'
import { useCustomToast } from '../hooks/useCustomToast'
import ShortUrl from './ShortUrl'

export default function ShortDetail({
  short,
}: {
  short: GetShortDetailsResponse
}) {
  const toast = useCustomToast()
  const navigate = useNavigate()

  const { mutate: handleDel, isLoading } = useDeleteShort(short.shortUrl, {
    onSuccess: () => {
      toast({
        title: 'Link deleted.',
        status: 'success',
      })
      navigate('/')
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete',
        description: error.response?.data.message,
        status: 'error',
        isClosable: true,
      })
    },
  })

  return (
    <Flex w='full'>
      <Box>
        <Heading fontSize={'xl'} fontWeight={'semibold'} as={'h3'}>
          <ShortUrl short={short.shortUrl}></ShortUrl>
        </Heading>
        <Box fontSize={'sm'} fontWeight={'light'}>
          <Text as='span'>{`Created on `}</Text>
          <Text as='span'>
            {format(new Date(short.createdAt), 'dd MMM yyyy, hh:mm:ss a')}
          </Text>
        </Box>
      </Box>
      <Spacer />
      <Box>
        <IconButton mr={2} aria-label='Edit Icon' icon={<EditIcon />} />
        <IconButton
          isLoading={isLoading}
          onClick={() => handleDel()}
          color={'red.500'}
          aria-label='Delete Icon'
          icon={<DeleteIcon />}
        />
      </Box>
    </Flex>
  )
}
