'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/header'
import { CustomDataTable } from '@/components/customDatatable'
import { useTags } from '@/hooks/useTags'
import { getTagsColumns } from '@/config/tagsColumns'
import CreateTagsForm from '@/components/forms/createTagsForm'

function Tags() {
  const { data } = useTags()
  const columns = getTagsColumns()
  return (
    <div className="h-full overflow-auto ">
      <Header
        title="Tags"
        desc="Create tags"
        buttons
        buttonTitle="Create tags"
        icon={Plus}
        modalSize="md:max-w-[400px]"
        modalButton
        modalTitle="Create tags"
        components={<CreateTagsForm />}
      />
      <CustomDataTable columns={columns} data={data} searchItem="tag_name" />
    </div>
  )
}

export default Tags
