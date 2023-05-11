import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import api from './api'

export type ShortenPayload = {
  originalUrl: string
  customShortUrl?: string
}

export type ShortenUrlType = {
  id: string
  originalUrl: string
  shortUrl: string
  ownerId?: string
}

// create
const createShort = async (payload: ShortenPayload) => {
  const { data } = await api.post('shorten', payload)
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

// get
const getShorts = async () => {
  const { data } = await api.get('shorten')
  return data
}

export const useGetShorten = () =>
  useQuery<ShortenUrlType[]>({
    queryKey: ['shorten'],
    queryFn: () => getShorts(),
    initialData: [],
    refetchOnWindowFocus: false,
  })

// get one
export type GetShortDetailsResponse = {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: string
  updatedAt: string
  totalClicks: number
  statistics: { period: string; count: number }[]
}

const getSingleShort = async (
  short: string
): Promise<GetShortDetailsResponse> => {
  const { data } = await api.get<GetShortDetailsResponse>(`shorten/${short}`)
  return data
}

export const useSingleOneShort = (
  short: string,
  opts: UseQueryOptions<GetShortDetailsResponse> = {}
) =>
  useQuery<GetShortDetailsResponse>({
    queryKey: ['shorten-detail', short],
    queryFn: () => getSingleShort(short),
    ...opts,
  })

// Delete
const deleteShort = async (short: string): Promise<void> => {
  await api.delete<GetShortDetailsResponse>(`shorten/${short}`)
}

export const useDeleteShort = (
  short: string,
  opts: UseMutationOptions<void> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...opts,
    mutationFn: () => deleteShort(short),
    onSuccess: (...args) => {
      opts.onSuccess?.(...args)
      queryClient.invalidateQueries(['shorten'])
    },
  })
}
