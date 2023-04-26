import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { useSize } from '@chakra-ui/react-use-size'
import { useRef } from 'react'
import { useOutlet } from 'react-router-dom'
import { useGetShorten } from '../api/shorten'
import CreateNewModal from '../components/CreateShortenModal'
import ShortenCard from '../components/ShortenCard'

export default function Home() {
  const { data } = useGetShorten()
  const headerRef = useRef<HTMLDivElement>(null)
  const hSize = useSize(headerRef)

  const containerRef = useRef<HTMLDivElement>(null)
  const cSize = useSize(containerRef)

  const outlet = useOutlet()

  return (
    <Container
      ref={containerRef}
      h='full'
      maxW='container.lg'
      mx={'auto'}
      p={4}
    >
      <VStack>
        <Flex
          ref={headerRef}
          my={4}
          px={4}
          mx='auto'
          maxW='md'
          align={'center'}
        >
          {data?.length === 10 ? (
            <Heading as={'h3'} size={'sm'} fontWeight={'normal'}>
              You have reached the maximum limit of 10 links allowed per user.
              Please delete a link to add a new one.{' '}
            </Heading>
          ) : (
            <Heading as={'h3'} size={'sm'} fontWeight={'normal'}>
              You have created {data?.length}/10 links. Click <CreateNewModal />{' '}
              to create new link.
            </Heading>
          )}
        </Flex>

        <Flex
          w='100%'
          direction={['column', null, 'row']}
          justify={['center']}
          align={['center', null, 'start']}
        >
          <VStack
            h={[
              '100%',
              null,
              `calc(${cSize?.height}px - ${hSize?.height}px - 4rem)`,
            ]}
            overflowY={'auto'}
            spacing={2}
            align='sketch'
            w={['100%', 'sm', '300px', 'sm']}
          >
            {data?.map((link) => (
              <Box key={link.id} w='full' pr={['', '', 4]}>
                <ShortenCard link={link} />
              </Box>
            ))}
          </VStack>
          <Box flex={1}>
            {outlet || (
              <Box
                display={['none', null, 'block']}
                h={`calc(${cSize?.height}px - ${hSize?.height}px - 4rem)`}
                bg='white'
                rounded={4}
                p={4}
              >
                <Text pt={12} align={'center'} fontWeight={'light'}>
                  Select a link to see details
                </Text>
              </Box>
            )}
          </Box>
        </Flex>
      </VStack>
    </Container>
  )
}
