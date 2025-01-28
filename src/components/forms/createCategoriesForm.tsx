'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '../multi-select'
import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'
import { useCreateCategories, useUpdateCategory } from '@/services/mutations/categories'
import useModalStore from '../../store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDomains } from '@/hooks/useDomains'
import { useTags } from '@/hooks/useTags'
import { useSingleCategory } from '@/hooks/useCategories'

const formSchema = z.object({
  category_name: z.string().min(3, { message: 'Category name must be at least 3 characters long' }),
  category_desc: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
  category_slug: z.string().min(3, { message: 'Slug must be at least 3 characters long' })
})

const CreateCategoriesForm: React.FC<{ categoryId?: string | null }> = ({ categoryId }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { setIsModalOpen, setIsEditModalOpen } = useModalStore()
  const [selectedDomains, setSelectedDomains] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const { data: domainData } = useDomains()
  const { data: tagData } = useTags()
  const { data: categoryData } = useSingleCategory(categoryId)

  const createCategoriesMutation = useCreateCategories()
  const updateCategoriesMutation = useUpdateCategory(categoryId)

  const domains = useMemo(() => {
    return (
      domainData?.map((item) => ({
        value: item.documentId,
        label: item.domain_name
      })) || []
    )
  }, [domainData])

  const tags = useMemo(() => {
    return (
      tagData?.map((item) => ({
        value: item.documentId,
        label: item.tag_name
      })) || []
    )
  }, [tagData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: '',
      category_desc: '',
      category_slug: ''
    }
  })

  useEffect(() => {
    if (categoryId && categoryData) {
      form.reset({
        category_name: categoryData.category_name || '',
        category_desc: categoryData.category_desc || '',
        category_slug: categoryData.category_slug || ''
      })
    }
  }, [categoryId, categoryData, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(categoryId)
    const categoriesData: CategoriesData = {
      data: {
        category_name: values.category_name,
        category_desc: values.category_desc,
        category_slug: values.category_slug,
        domains: selectedDomains, // Create a comma-separated string of document_ids
        tags: selectedTags // Create a comma-separated string of document_ids
      }
    }
    if (categoryId !== undefined && categoryId !== null) {
      updateCategoriesMutation.mutate(
        { categoryId, data: categoriesData.data },
        {
          onError: () => {
            setIsLoading(false)
          },
          onSuccess: () => {
            setIsLoading(false)
            setIsEditModalOpen(false)
          }
        }
      )
    } else {
      createCategoriesMutation.mutate(categoriesData, {
        onError: () => {
          setIsLoading(false)
        },
        onSuccess: () => {
          setIsLoading(false)
          setIsModalOpen(false)
        }
      })
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Description */}
          <FormField
            control={form.control}
            name="category_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Desc</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category desc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Slug */}
          <FormField
            control={form.control}
            name="category_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Slug(URL)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Domains Selection */}

          <FormItem>
            <FormLabel>
              Domains
              <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              {domains.length > 0 ? (
                <MultiSelect
                  options={domains}
                  onValueChange={setSelectedDomains}
                  defaultValue={selectedDomains}
                  placeholder="Select Domains"
                  variant="inverted"
                  maxCount={3}
                />
              ) : (
                <p>No domains found</p>
              )}
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>
              Tags
              <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              {domains.length > 0 ? (
                <MultiSelect
                  options={tags}
                  onValueChange={setSelectedTags}
                  defaultValue={selectedTags}
                  placeholder="Select Tags"
                  variant="inverted"
                  maxCount={3}
                />
              ) : (
                <p>No domains found</p>
              )}
            </FormControl>
          </FormItem>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="w-full" size="lg" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                </>
              ) : categoryId ? (
                'Update Category'
              ) : (
                'Create Category'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateCategoriesForm
