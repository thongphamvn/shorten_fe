import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ShortDetail() {
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

  const isSmallScreen = useBreakpointValue({ base: true, md: false })

  const Content = <Box bg='green.50'>Link detail goes here {shortUrl}</Box>

  if (!isSmallScreen) {
    return Content
  }

  return (
    <Drawer
      closeOnOverlayClick={false}
      placement={'bottom'}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent minH={'50%'} roundedTop={8}>
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
        <DrawerBody>{Content}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
