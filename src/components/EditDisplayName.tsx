import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useUpdateShort } from '../api/shorten'
import { useCustomToast } from '../hooks/useCustomToast'
import { ShortenResponse } from '../openapi'

export default function EditDisplayName({
  short,
  onSubmit,
  onCancel,
}: {
  short: ShortenResponse
  onSubmit: (v: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(short.displayName || '')
  const toast = useCustomToast()

  const { mutate: handleUpdate, isLoading } = useUpdateShort(short.shortUrl, {
    onSuccess: () => {
      toast({
        title: 'Link updated.',
        status: 'success',
      })
      setValue('')
      onSubmit(value)
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

  console.log(value)
  return (
    <Flex justify={'center'} width={'full'} maxW={400} alignItems={'center'}>
      <Input
        placeholder='Edit Display Name'
        variant='flushed'
        colorScheme='teal'
        autoFocus
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <Flex align={'end'}>
        <IconButton
          onClick={() => handleUpdate({ displayName: value })}
          mx={2}
          size={'sm'}
          aria-label='Edit Icon'
          variant={'outline'}
          color={'teal.500'}
          disabled={isLoading}
          isLoading={isLoading}
          icon={<CheckIcon />}
        />
        <IconButton
          onClick={onCancel}
          size={'sm'}
          aria-label='Edit Icon'
          color={'blackAlpha.700'}
          variant={'outline'}
          disabled={isLoading}
          icon={<CloseIcon />}
        />
      </Flex>
    </Flex>
  )
}
