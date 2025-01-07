import { useGetAllDomains } from '@/services/queries/domains'
import { Domain } from '@/types/commonTypes'

export const useDomains = () => {
  const allDomainsData = useGetAllDomains()
  const data: Domain[] = allDomainsData?.data?.data || []

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    return dateB.getTime() - dateA.getTime()
  })

  return { data: sortedData }
}
