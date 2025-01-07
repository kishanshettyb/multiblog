// src/hooks/useCategories.ts
import { useGetAllCategories } from '@/services/queries/categories'

export const useCategories = () => {
  const allCategoriesData = useGetAllCategories()
  const data = allCategoriesData?.data?.data || []
  return { data }
}
