import { useQuery } from '@tanstack/react-query'
import { getAllTags } from '../api/tags'

export function useGetAllTags() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
