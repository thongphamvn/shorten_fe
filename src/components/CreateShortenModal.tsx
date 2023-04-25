import {
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
import { ShortenResponse } from '@common'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCreateShort } from '../api/shorten'
import ShortUrl from './ShortUrl'

type CreatePayload = {
  longUrl: string
  customShortUrl?: string
}

const schema = yup.object<CreatePayload>().shape({
  longUrl: yup
    .string()
    .url('Please enter a valid URL')
    .required('This field is required'),
  customShortUrl: yup.string(),
})

export default function CreateNewModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement | null>(null)
  const finalRef = React.useRef(null)
  const [createdShort, setCreatedShort] = useState<ShortenResponse>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePayload>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading, isError } = useCreateShort({
    onSuccess: (data) => {
      setCreatedShort(data)
    },
  })

  const onSubmit = async (data: CreatePayload) => {
    await mutate({ originalUrl: data.longUrl })
  }

  const createdContent = () => {
    if (!createdShort) {
      return null
    }

    return (
      <ModalContent>
        <ModalHeader>Your Created Short</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ShortUrl short={createdShort.shortUrl} />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setCreatedShort(undefined)
              reset()
            }}
          >
            Create another
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  }

  const { ref, ...longRest } = register('longUrl', { required: true })
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Create New
      </Button>
      <Modal
        initialFocusRef={createdShort ? undefined : initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        {createdShort ? (
          createdContent()
        ) : (
          <ModalContent>
            <ModalHeader>Create your Short</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired isInvalid={!!errors.longUrl}>
                <FormLabel>Long URL</FormLabel>
                <Input
                  {...longRest}
                  ref={(e) => {
                    ref(e)
                    initialRef.current = e
                  }}
                />
                {errors.longUrl && (
                  <FormErrorMessage>
                    {errors.longUrl.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Custom short URL</FormLabel>
                <Input {...register('customShortUrl')} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                colorScheme="teal"
                mr={3}
                onClick={handleSubmit(onSubmit)}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}
