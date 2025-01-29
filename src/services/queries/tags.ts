import { useQuery } from '@tanstack/react-query'
import { getAllTags, getSingleTag } from '../api/tags'

export function useGetAllTags() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}

export function useGetSingeTag(tagId: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['tags', tagId],
    queryFn: () => getSingleTag(tagId),
    staleTime: 1000,
    enabled: !!tagId,
    refetchOnMount: false
  })
  return { isLoading, isError, data, isFetching }
}
