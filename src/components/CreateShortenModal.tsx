import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCreateShort } from '../api/shorten'
import { ShortenUrlDto } from '../openapi'

const schema = yup.object<ShortenUrlDto>().shape({
  originalUrl: yup
    .string()
    .url('Please enter a valid URL')
    .required('This field is required'),
  customShortUrl: yup.string(),
  displayName: yup.string(),
})

export default function CreateNewModal({
  createBtn,
}: {
  createBtn: React.ReactElement
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement | null>(null)
  const finalRef = React.useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ShortenUrlDto>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useCreateShort({
    onSuccess: () => {
      reset()
      onClose()
    },
    onError: (error: any) => {
      console.log(error.response?.data.message)
      setError('customShortUrl', {
        type: 'server',
        message: error.response?.data.message,
      })
    },
  })

  const onSubmit = async (data: ShortenUrlDto) => {
    await mutate({
      originalUrl: data.originalUrl,
      customShortUrl: data.customShortUrl,
      displayName: data.displayName,
    })
  }

  const { ref, ...longRest } = register('originalUrl', { required: true })

  return (
    <>
      <Box as='span' onClick={onOpen}>
        {createBtn}
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Short URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.originalUrl}>
              <FormLabel>Long URL</FormLabel>
              <Input
                {...longRest}
                ref={(e) => {
                  ref(e)
                  initialRef.current = e
                }}
              />
              {errors.originalUrl && (
                <FormErrorMessage>
                  {errors.originalUrl.message as string}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.customShortUrl}>
              <FormLabel>Custom short URL</FormLabel>
              <Input {...register('customShortUrl')} />
              {errors.customShortUrl && (
                <FormErrorMessage>
                  {errors.customShortUrl.message as string}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Display Name</FormLabel>
              <Input {...register('displayName')} />
              {errors.displayName && (
                <FormErrorMessage>
                  {errors.displayName.message as string}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme='teal'
              mr={3}
              onClick={handleSubmit(onSubmit)}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
