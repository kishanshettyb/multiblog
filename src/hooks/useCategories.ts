// src/hooks/useCategories.ts
import { useGetAllCategories } from '@/services/queries/categories'
import { Categories } from '@/types/commonTypes'

export const useCategories = () => {
  const allCategoriesData = useGetAllCategories()
  const data: Categories[] = allCategoriesData?.data?.data || []

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    return dateB.getTime() - dateA.getTime()
  })
  return { data: sortedData }
}
