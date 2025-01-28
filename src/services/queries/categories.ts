import { useQuery } from '@tanstack/react-query'
import { getAllCategories, getSingleCategory } from '../api/categories'

export function useGetAllCategories() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}

export function useGetSingeCategory(categoryId: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => getSingleCategory(categoryId),
    staleTime: 1000,
    enabled: !!categoryId,
    refetchOnMount: false
  })
  return { isLoading, isError, data, isFetching }
}
