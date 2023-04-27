import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useDeleteShort, useSingleOneShort } from '../api/shorten'
import { useCustomToast } from '../hooks/useCustomToast'
import ShortUrl from './ShortUrl'
import Statistic from './Statistic'

export default function ShortDetail({ shortUrl }: { shortUrl: string }) {
  const toast = useCustomToast()
  const navigate = useNavigate()

  const {
    data: short,
    isFetching,
    error,
  } = useSingleOneShort(shortUrl!, {
    enabled: !!shortUrl,
    refetchOnWindowFocus: false,
  })

  const { mutate: handleDel, isLoading } = useDeleteShort(shortUrl, {
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

  if (error) {
    return <Box>Something went wrong</Box>
  }

  if (isFetching || !short) {
    return (
      <Flex gap={4} direction={'column'} w='100%'>
        <Skeleton h={20} />
        <Skeleton h={20} />
        <Skeleton h={20} />
      </Flex>
    )
  }

  return (
    <Box>
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

      <Box>
        <Text>Total visits: 100</Text>
      </Box>

      <Box height={'300px'}>
        <Text>Statistics in the last 6 months</Text>
        <Statistic />
      </Box>
    </Box>
  )
}
