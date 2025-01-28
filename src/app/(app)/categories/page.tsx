'use client'
import React from 'react'
import Header from '@/components/header'
import { Layers2 } from 'lucide-react'
import { CustomDataTable } from '@/components/customDatatable'
import CreateCategoriesForm from '@/components/forms/createCategoriesForm'
import { getCategoryColumns } from '@/config/categoriesColumns'
import { useCategories } from '@/hooks/useCategories'
import { CustomModal } from '@/components/customModal'
import useModalStore from '@/store/store'

function CategoriesPage() {
  const { data } = useCategories()
  const columns = getCategoryColumns()
  const { setIsEditModalOpen, isEditModalOpen, documentId } = useModalStore()
  const { setIsModalOpen, isModalOpen } = useModalStore()

  return (
    <div>
      <Header
        title="Categories"
        desc=""
        icon={Layers2}
        buttons
        modalButton
        buttonTitle="Create Categories"
      />
      <CustomDataTable columns={columns} data={data} searchItem="category_name" />
      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Create Categories"
        desc="Create categories for Domains"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <CreateCategoriesForm />
        </div>
      </CustomModal>
      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Edit Categories"
        desc="Edit categories for Domains"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div>
          <CreateCategoriesForm categoryId={documentId ? documentId : null} />
        </div>
      </CustomModal>
    </div>
  )
}

export default CategoriesPage
