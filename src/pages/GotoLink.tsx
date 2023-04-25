import { useParams } from 'react-router-dom'
import { useGotoLink } from '../api/shorten'

export default function GotoLink() {
  const { shortUrl } = useParams()

  useGotoLink(String(shortUrl), {
    onSuccess: (data) => {
      window.location.replace(data.url)
    },
  })

  return <div></div>
}
