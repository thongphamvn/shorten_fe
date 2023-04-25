import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { useGetShorten } from '../api/shorten'
import CreateNewModal from '../components/CreateShortenModal'
import ShortenCard from '../components/ShortenCard'

export default function Home() {
  const { data } = useGetShorten()

  console.log(data)
  return (
    <Container maxW='container.md' mx={'auto'} p={4}>
      <Grid gap={4} gridTemplateColumns={['1fr', null, '300px 1fr']}>
        <GridItem>
          <Flex mb={4} px={4} mx='auto' maxW='sm' mt={10} align={'center'}>
            {data?.length === 10 ? (
              <Heading as={'h3'} size={'sm'} fontWeight={'semibold'}>
                You have reached the maximum limit of 10 links allowed per user.
                Please delete a link to add a new one.{' '}
              </Heading>
            ) : (
              <Heading as={'h3'} size={'sm'} fontWeight={'semibold'}>
                You have created {data?.length}/10 links. Click{' '}
                <CreateNewModal /> to create new link.
              </Heading>
            )}
            <Spacer />
          </Flex>
          <Flex direction='column' maxW='sm' mx='auto' gap={2}>
            {data?.map((link) => (
              <ShortenCard link={link} key={link.id} />
            ))}
          </Flex>
        </GridItem>
        <GridItem>
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  )
}
