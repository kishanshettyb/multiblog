'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/header'
import { CustomDataTable } from '@/components/customDatatable'
import { useTags } from '@/hooks/useTags'
import { getTagsColumns } from '@/config/tagsColumns'
import CreateTagsForm from '@/components/forms/createTagsForm'
import { CustomModal } from '@/components/customModal'
import useModalStore from '@/store/store'

function Tags() {
  const { data } = useTags()
  const columns = getTagsColumns()
  const { setIsEditModalOpen, isEditModalOpen, documentId } = useModalStore()
  const { isModalOpen, setIsModalOpen } = useModalStore()

  return (
    <div className="h-full overflow-auto ">
      <Header
        title="Tags"
        desc="Create tags"
        buttons
        buttonTitle="Create tags"
        icon={Plus}
        modalButton
      />

      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Create Tags"
        desc="tags"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <CreateTagsForm tagId={documentId ? documentId : null} />
        </div>
      </CustomModal>

      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Edit Tags"
        desc="Edit Tags"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div>
          <CreateTagsForm tagId={documentId ? documentId : null} />
        </div>
      </CustomModal>
      <CustomDataTable columns={columns} data={data} searchItem="tag_name" />
    </div>
  )
}

export default Tags
