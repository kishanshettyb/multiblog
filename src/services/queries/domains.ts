import { useQuery } from '@tanstack/react-query'
import { getAllDomains } from '../api/domains'

export function useGetAllDomains() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['domains'],
    queryFn: () => getAllDomains(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
