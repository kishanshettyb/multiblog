import { useCategories } from '@/hooks/useCategories'
import { useDomains } from '@/hooks/useDomains'
import { useTags } from '@/hooks/useTags'
import React from 'react'
import { MultiSelect } from './multi-select'
import usePostStore from '@/store/postStore'

type Option = {
  value: string
  label: string
}

function DomainsCategories() {
  const {
    selectedDomains,
    setSelectedDomains,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags
  } = usePostStore()

  const { data: domainData } = useDomains()
  const domains: Option[] =
    domainData?.map((item) => ({
      value: item.documentId ?? '',
      label: item.domain_name ?? ''
    })) || []

  const { data: tagData } = useTags()
  const tagsData: Option[] =
    tagData?.map((item) => ({
      value: item.documentId ?? '',
      label: item.tag_name ?? ''
    })) || []

  const { data: categoryData } = useCategories()
  const categoriesData: Option[] =
    categoryData?.map((item) => ({
      value: item.documentId ?? '',
      label: item.category_name ?? ''
    })) || []

  return (
    <div className="border rounded-xl p-4">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-600 text-lg">Domains</h2>
        {domains.length > 0 ? (
          <MultiSelect
            options={domains}
            onValueChange={setSelectedDomains}
            defaultValue={selectedDomains}
            placeholder="Select Domains"
            variant="secondary"
            maxCount={6}
          />
        ) : (
          <p>No domains found</p>
        )}
      </div>

      <div className="mb-5">
        <h2 className="font-semibold text-slate-600 text-lg">Categories</h2>
        {categoriesData.length > 0 ? (
          <MultiSelect
            options={categoriesData}
            onValueChange={setSelectedCategories}
            defaultValue={selectedCategories}
            placeholder="Select Categories"
            variant="secondary"
            maxCount={6}
          />
        ) : (
          <p>No categories found</p>
        )}
      </div>

      <div className="mb-5">
        <h2 className="font-semibold text-slate-600 text-lg">Tags</h2>
        {tagsData.length > 0 ? (
          <MultiSelect
            options={tagsData}
            onValueChange={setSelectedTags}
            defaultValue={selectedTags}
            placeholder="Select Tags"
            variant="secondary"
            maxCount={6}
          />
        ) : (
          <p>No tags found</p>
        )}
      </div>
    </div>
  )
}

export default DomainsCategories
