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
  displayName?: string
}
export type ShortenResponse = {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: string
  updatedAt: string
  totalClicks: number
  displayName?: string
}

// create
const createShort = async (payload: ShortenPayload) => {
  const { data } = await api.post('shorten', payload)
  return data
}

export const useCreateShort = (
  opts: UseMutationOptions<ShortenResponse, AxiosError, ShortenPayload> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation<ShortenResponse, AxiosError, ShortenPayload>({
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
  useQuery<ShortenResponse[]>({
    queryKey: ['shorten'],
    queryFn: () => getShorts(),
    initialData: [],
    refetchOnWindowFocus: false,
  })

const getSingleShort = async (short: string): Promise<ShortenResponse> => {
  const { data } = await api.get<ShortenResponse>(`shorten/${short}`)
  return data
}

export const useSingleOneShort = (
  short: string,
  opts: UseQueryOptions<ShortenResponse> = {}
) =>
  useQuery<ShortenResponse>({
    queryKey: ['shorten-stats', short],
    queryFn: () => getSingleShort(short),
    ...opts,
  })

// Delete
const deleteShort = async (short: string): Promise<void> => {
  await api.delete(`shorten/${short}`)
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

// Update
type UpdateShortDto = {
  displayName?: string
}

const updateShort = async (
  short: string,
  dto: UpdateShortDto
): Promise<ShortenResponse> => {
  return api.put(`shorten/${short}`, dto)
}

export const useUpdateShort = (
  short: string,
  opts: UseMutationOptions<ShortenResponse, AxiosError, UpdateShortDto> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation<ShortenResponse, AxiosError, UpdateShortDto>({
    ...opts,
    mutationFn: (dto) => updateShort(short, dto),
    onSuccess: (...args) => {
      opts.onSuccess?.(...args)
      queryClient.invalidateQueries(['shorten'])
    },
  })
}

// get stats
export type ShortStatistics = {
  timestamp: string
  count: number
}

type Period = '24h' | '7days'
const getStats = async (
  short: string,
  query: { period: Period }
): Promise<ShortStatistics[]> => {
  const { data } = await api.get<ShortStatistics[]>(`shorten/${short}/stats`, {
    params: query,
  })
  return data
}

export const useGetStats = (
  short: string,
  period: Period,
  opts: UseQueryOptions<ShortStatistics[]> = {}
) =>
  useQuery({
    queryKey: ['shorten-stats', short, period],
    queryFn: () => getStats(short, { period }),
    ...opts,
  })
