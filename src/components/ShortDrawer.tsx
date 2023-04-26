import { CloseIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function ShortDrawer({ children }: Props) {
  const { shortUrl } = useParams()
  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (shortUrl) {
      onOpen()
    } else {
      onClose()
    }
  }, [shortUrl, onOpen])

  const handleClose = () => {
    onClose()
    navigate('/')
  }

  return (
    <Drawer
      closeOnOverlayClick={false}
      placement={'bottom'}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent minH={'100%'} roundedTop={8}>
        <DrawerHeader borderBottomWidth='1px'>
          <Flex align={'center'}>
            <Text>Link Details</Text>
            <Spacer />
            <IconButton
              onClick={handleClose}
              color={'teal.600'}
              aria-label='Close Icon'
              icon={<CloseIcon />}
            />
          </Flex>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
