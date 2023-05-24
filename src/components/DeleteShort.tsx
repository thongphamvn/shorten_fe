import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteShort } from '../api/shorten'
import { useCustomToast } from '../hooks/useCustomToast'

export default function DeleteShort({ shortUrl }: { shortUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const toast = useCustomToast()
  const navigate = useNavigate()

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

  return (
    <Box>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            isLoading={isLoading}
            variant={'outline'}
            size={'sm'}
            colorScheme='red'
            onClick={() => setIsOpen(true)}
            color={'red.500'}
            aria-label='Delete Icon'
            icon={<DeleteIcon />}
          />
        </PopoverTrigger>
        <PopoverContent width={200}>
          <PopoverBody>Are you sure?</PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button
                onClick={() => {
                  setIsOpen(false)
                }}
                variant='outline'
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false)
                  handleDel()
                }}
                colorScheme='red'
              >
                Yes
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
