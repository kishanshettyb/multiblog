import React, { useState } from 'react'
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
import { useCreateCategories } from '@/services/mutations/categories'
import useModalStore from '@/app/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDomains } from '@/hooks/useDomains'
import { CategoriesData } from '@/types/commonTypes'

const formSchema = z.object({
  category_name: z.string().min(3, { message: 'Category name must be at least 3 characters long' }),
  category_desc: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
  category_slug: z.string().min(3, { message: 'Slug must be at least 3 characters long' })
})

function CreateCategoriesForm() {
  const [selectedDomains, setSelectedDomains] = useState([]) // Ensure state can hold full domain objects
  const { setIsModalOpen } = useModalStore()
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useDomains()
  const createCategoriesMutation = useCreateCategories()

  const domains = data
  domains.forEach((item) => {
    item.value = item.documentId
    item.label = item.domain_name
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      category_name: '',
      category_desc: '',
      category_slug: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const categoriesData: CategoriesData = {
      data: {
        category_name: values.category_name,
        category_desc: values.category_desc,
        category_slug: values.category_slug,
        domains: selectedDomains // Create a comma-separated string of document_ids
      }
    }
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="w-full" size="lg" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                </>
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
