import {
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useOutlet } from 'react-router-dom'
import { useGetShorten } from '../api/shorten'
import CreateNewModal from '../components/CreateShortenModal'
import ShortenCard from '../components/ShortenCard'

export default function Home() {
  const { data, isFetching } = useGetShorten()

  const outlet = useOutlet()

  if (!isFetching && !data?.length) {
    return (
      <Container
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h='100%'
        maxW='container.lg'
        mx={'auto'}
        p={4}
      >
        <Text>
          Click <CreateNewModal /> to create your first link.
        </Text>
      </Container>
    )
  }

  return (
    <Container h='100%' maxW='container.lg' mx={'auto'} p={4}>
      <VStack>
        <Flex h={8} my={4} px={4} mx='auto' maxW='lg' align={'center'}>
          <SkeletonText isLoaded={!isFetching}>
            {data?.length === 10 ? (
              <Heading as={'h3'} size={'sm'} fontWeight={'normal'}>
                You have reached the maximum limit of 10 links allowed per user.
                Please delete a link to add a new one.{' '}
              </Heading>
            ) : (
              <Heading as={'h3'} size={'sm'} fontWeight={'normal'}>
                There is a limit of 10 links that each user can create. You have
                already created {data?.length} out of 10. To add a new link,
                please click <CreateNewModal />.
              </Heading>
            )}
          </SkeletonText>
        </Flex>

        <Flex
          w='100%'
          direction={['column', null, 'row']}
          justify={['center']}
          align={['center', null, 'start']}
        >
          <VStack
            h={['100%', null, `calc(100vh - 9.5rem)`]}
            bg={[null, null, 'white']}
            overflowY={'auto'}
            spacing={2}
            align='sketch'
            w={['100%', 'sm', '300px', 'sm']}
            mr={['', '', 4]}
            rounded={4}
          >
            {isFetching && (
              <Box display={'flex'} flexDirection={'column'} gap={4} mx={4}>
                <Skeleton mt={4} h={20} />
                <Skeleton h={20} />
                <Skeleton h={20} />
                <Skeleton h={20} />
                <Skeleton h={20} />
                <Skeleton h={20} />
              </Box>
            )}

            {!isFetching &&
              data?.map((link) => (
                <Box key={link.id} w='full'>
                  <ShortenCard link={link} />
                </Box>
              ))}
          </VStack>

          <Box flex={1}>
            <Box
              display={['none', null, 'block']}
              h={`calc(100vh - 9.5rem)`}
              bg='white'
              rounded={4}
              p={4}
            >
              {outlet || (
                <Skeleton isLoaded={!isFetching}>
                  <Text pt={12} align={'center'} fontWeight={'light'}>
                    Select a link to see details
                  </Text>
                </Skeleton>
              )}
            </Box>
          </Box>
        </Flex>
      </VStack>
    </Container>
  )
}
