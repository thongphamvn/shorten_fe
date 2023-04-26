import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ShortenPayload, ShortenUrlType, useCreateShort } from '../api/shorten'

const schema = yup.object<ShortenPayload>().shape({
  originalUrl: yup
    .string()
    .url('Please enter a valid URL')
    .required('This field is required'),
  customShortUrl: yup.string(),
})

export default function CreateNewModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement | null>(null)
  const finalRef = React.useRef(null)
  const [createdShort, setCreatedShort] = useState<ShortenUrlType>()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ShortenPayload>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useCreateShort({
    onSuccess: (data) => {
      setCreatedShort(data)
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

  const onSubmit = async (data: ShortenPayload) => {
    await mutate({
      originalUrl: data.originalUrl,
      customShortUrl: data.customShortUrl,
    })
  }

  const { ref, ...longRest } = register('originalUrl', { required: true })

  return (
    <>
      <Link
        onClick={onOpen}
        aria-label='Add New'
        color={'teal.500'}
        bgColor={'white'}
        borderColor={'teal.500'}
        fontWeight={'semibold'}
      >
        here
      </Link>

      <Modal
        initialFocusRef={createdShort ? undefined : initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Short</ModalHeader>
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
