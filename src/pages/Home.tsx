import { useGetShorten } from '../api/shorten'
import CreateNewModal from '../components/CreateShortenModal'
import ShortenCard from '../components/ShortenCard'

export default function Home() {
  const { data } = useGetShorten()

  return (
    <div>
      <CreateNewModal />
      {data?.map((link) => (
        <ShortenCard link={link} key={link.id} />
      ))}
    </div>
  )
}
