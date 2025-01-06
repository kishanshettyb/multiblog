'use client'
import React from 'react'
import Header from '@/components/header'
import { useGetAllCategories } from '@/services/queries/categories'
import { Layers2 } from 'lucide-react'
import { CustomDataTable } from '@/components/customDatatable'
import CreateCategoriesForm from '@/components/forms/createCategoriesForm'
import { getCategoryColumns } from '@/config/categoriesColumns'

function CategoriesPage() {
  const allCategoriesData = useGetAllCategories()
  const data = allCategoriesData?.data?.data || []
  const columns = getCategoryColumns()

  return (
    <div>
      <Header
        title="Categories"
        desc=""
        icon={Layers2}
        buttons
        buttonTitle="Create Category"
        modalButton
        modalTitle="Crete Categories"
        components={<CreateCategoriesForm />}
      />
      <CustomDataTable columns={columns} data={data} searchItem="category_name" />
    </div>
  )
}

export default CategoriesPage
