import { useGetAllDomains } from '@/services/queries/domains'
export const useDomains = () => {
  const allDomainsData = useGetAllDomains()
  const data = allDomainsData?.data?.data || []
  return { data }
}
