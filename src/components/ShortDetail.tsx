import { CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Skeleton, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useDeleteShort, useSingleOneShort } from '../api/shorten'
import { useCustomToast } from '../hooks/useCustomToast'
import { buildShortUrl } from '../utils'
import CopyText from './CopyText'
import Statistics from './Statistics'

export default function ShortDetail({ shortUrl }: { shortUrl: string }) {
  const toast = useCustomToast()
  const navigate = useNavigate()

  const {
    data: short,
    isFetching,
    error,
  } = useSingleOneShort(shortUrl, {
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
    <Box flex={1}>
      <Flex alignItems={'start'}>
        <Box flex={1}>
          <Flex align={'center'}>
            <Text fontWeight={'semibold'} fontSize={'lg'}>
              {short.displayName}
            </Text>
            <IconButton
              mr={2}
              size={'sm'}
              aria-label='Edit Icon'
              variant={'ghost'}
              icon={<EditIcon />}
            />
          </Flex>
          <Flex
            align={'center'}
            fontWeight={'semibold'}
            color={'teal'}
            fontSize={'md'}
          >
            <Text>{buildShortUrl(short.shortUrl)}</Text>
            <CopyText text={buildShortUrl(short.shortUrl)} />
          </Flex>

          <Flex
            align={'center'}
            fontSize={'sm'}
            fontWeight={'light'}
            fontStyle={'italic'}
          >
            <CalendarIcon />
            <Text pl={1} as='span'>
              {format(new Date(short.createdAt), 'dd MMM yyyy, hh:mm:ss a')}
            </Text>
          </Flex>
        </Box>

        <Box ml={2}>
          <IconButton
            isLoading={isLoading}
            variant={'outline'}
            size={'sm'}
            colorScheme='red'
            onClick={() => handleDel()}
            color={'red.500'}
            aria-label='Delete Icon'
            icon={<DeleteIcon />}
          />
        </Box>
      </Flex>

      <Box py={1} mt={8}>
        <Text as={'h3'} fontSize={'xl'} fontWeight={'semibold'}>
          Original URL
        </Text>
        <Text wordBreak={'break-word'} width={['100%']} fontStyle={'italic'}>
          {short.originalUrl}
        </Text>
      </Box>

      <Box mt={8}>
        <Text as={'h3'} fontSize={'xl'} fontWeight={'semibold'}>
          Total visits: {short.totalClicks}
        </Text>
      </Box>

      <Box mt={8}>
        <Statistics shortUrl={short.shortUrl} />
      </Box>
    </Box>
  )
}
