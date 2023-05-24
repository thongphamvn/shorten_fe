import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Skeleton,
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
          <CreateNewModal
            createBtn={
              <Link
                as={'span'}
                aria-label='Add New'
                color={'teal.500'}
                fontWeight={'bold'}
              >
                Click here
              </Link>
            }
          />{' '}
          to create your first link.
        </Text>
      </Container>
    )
  }

  return (
    <Container h='100%' maxW='container.lg' mx={'auto'} p={9}>
      <VStack>
        <Flex width={'100%'} px={4} alignItems={'end'} justify={'flex-end'}>
          {data?.length < 10 && (
            <CreateNewModal
              createBtn={
                <Button
                  leftIcon={<AddIcon />}
                  aria-label='Add New'
                  colorScheme='teal'
                  size={'sm'}
                  variant={'ghost'}
                  isDisabled={isFetching}
                >
                  New Link
                </Button>
              }
            />
          )}
          {data?.length === 10 && (
            <Text fontSize={'sm'} fontWeight={'light'}>
              You have reached the maximum limit of 10 links allowed per user.
              Please delete a link to add a new one.{' '}
            </Text>
          )}
        </Flex>

        <Flex
          w='100%'
          direction={['column', null, 'row']}
          justify={['center']}
          align={['center', null, 'start']}
        >
          <VStack
            h={[null, null, `calc(100vh - 9rem)`]}
            bg={[null, null, 'white']}
            overflowY={'auto'}
            spacing={0}
            align='sketch'
            w={['100%', 'sm', '300px']}
            minWidth={'300px'}
            mr={[null, null, 4]}
            rounded={4}
            mb={4}
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
                <Box
                  borderBottom={'1px'}
                  borderColor={'gray.100'}
                  key={link.shortUrl}
                  w='full'
                >
                  <ShortenCard link={link} />
                </Box>
              ))}
          </VStack>

          <Box flex={1}>
            <Box
              display={['none', null, 'block']}
              h={`calc(100vh - 9rem)`}
              bg='white'
              rounded={4}
              p={4}
              overflowX={'auto'}
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
