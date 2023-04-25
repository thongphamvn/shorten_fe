import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import api from './api'

export type ShortenPayload = {
  originalUrl: string
}
export type ShortenUrlType = {
  id: string
  originalUrl: string
  shortUrl: string
  ownerId?: string
}

const createShort = async (payload: ShortenPayload) => {
  const { data } = await api.post('shorten', payload)
  return data
}

const getShorts = async () => {
  const { data } = await api.get('shorten')
  return data
}

export const useCreateShort = (
  opts: UseMutationOptions<ShortenUrlType, AxiosError, ShortenPayload> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation<ShortenUrlType, AxiosError, ShortenPayload>({
    ...opts,
    mutationFn: (p: ShortenPayload) => createShort(p),
    onSuccess: (...args) => {
      opts.onSuccess?.(...args)
      queryClient.invalidateQueries(['shorten'])
    },
  })
}

export const useGetShorten = () =>
  useQuery<ShortenUrlType[]>({
    queryKey: ['shorten'],
    queryFn: () => getShorts(),
  })
