import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../api/createPost'

export function useGetAllPosts() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
