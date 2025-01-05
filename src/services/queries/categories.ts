import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../api/categories'

export function useGetAllCategories() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
