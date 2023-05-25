import { CalendarIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { ShortenResponse } from '../openapi'
import { buildShortUrl } from '../utils'
import CopyText from './CopyText'
import DeleteShort from './DeleteShort'
import EditDisplayName from './EditDisplayName'

export default function ShortDetailHeader({
  short,
}: {
  short: ShortenResponse
}) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Flex alignItems={'start'}>
      <Box flex={1}>
        <Flex align={'center'} width={'full'} height={18} my={2}>
          {isEdit ? (
            <EditDisplayName
              short={short}
              onSubmit={() => setIsEdit(false)}
              onCancel={() => setIsEdit(false)}
            />
          ) : (
            <Flex align={'center'}>
              <Text fontWeight={'semibold'} fontSize={'lg'}>
                {short.displayName}
              </Text>
              {!short.displayName && (
                <Text color={'gray.500'} fontStyle={'italic'}>
                  Edit Display Name
                </Text>
              )}
              <IconButton
                onClick={() => setIsEdit(!isEdit)}
                mx={2}
                size={'sm'}
                aria-label='Edit Icon'
                bg={'white'}
                icon={<EditIcon color={'gray.600'} />}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          align={'center'}
          fontWeight={'medium'}
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

      <Box ml={2}>{!isEdit && <DeleteShort shortUrl={short.shortUrl} />}</Box>
    </Flex>
  )
}
