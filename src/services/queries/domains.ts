import { useQuery } from '@tanstack/react-query'
import { getAllDomains, getSingleDomain } from '../api/domains'

export function useGetAllDomains() {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['domains'],
    queryFn: () => getAllDomains(),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}

export function useGetSingeDomain(domainId: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['domains', domainId],
    queryFn: () => getSingleDomain(domainId),
    staleTime: 1000,
    enabled: !!domainId,
    refetchOnMount: false
  })
  return { isLoading, isError, data, isFetching }
}
