import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  EditShortDto,
  ShortenResponse,
  ShortenUrlDto,
  StatsResponse,
} from '../openapi'
import api from './api'

// create
const createShort = async (payload: ShortenUrlDto) => {
  const { data } = await api.post('shorten', payload)
  return data
}

export const useCreateShort = (
  opts: UseMutationOptions<ShortenResponse, AxiosError, ShortenUrlDto> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation<ShortenResponse, AxiosError, ShortenUrlDto>({
    ...opts,
    mutationFn: (p: ShortenUrlDto) => createShort(p),
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

export const useGetShort = (
  short: string,
  opts: UseQueryOptions<ShortenResponse> = {}
) =>
  useQuery<ShortenResponse>({
    queryKey: [short],
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
const updateShort = async (
  short: string,
  dto: EditShortDto
): Promise<ShortenResponse> => {
  return api.put(`shorten/${short}`, dto)
}

export const useUpdateShort = (
  short: string,
  opts: UseMutationOptions<ShortenResponse, AxiosError, EditShortDto> = {}
) => {
  const queryClient = useQueryClient()
  return useMutation<ShortenResponse, AxiosError, EditShortDto>({
    ...opts,
    mutationFn: (dto) => updateShort(short, dto),
    onSuccess: (...args) => {
      opts.onSuccess?.(...args)
      queryClient.invalidateQueries([short])
    },
  })
}

// get stats
type Period = '24h' | '7days'
const getStats = async (
  short: string,
  query: { period: Period }
): Promise<StatsResponse[]> => {
  const { data } = await api.get<StatsResponse[]>(`shorten/${short}/stats`, {
    params: query,
  })
  return data
}

export const useGetStats = (
  short: string,
  period: Period,
  opts: UseQueryOptions<StatsResponse[]> = {}
) =>
  useQuery({
    queryKey: ['shorten-stats', short, period],
    queryFn: () => getStats(short, { period }),
    ...opts,
  })
