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
import { useGetAllDomains } from '@/services/queries/domains'

const formSchema = z.object({
  category_name: z.string().min(3, { message: 'Category name must be at least 3 characters long' }),
  category_desc: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
  category_slug: z.string().min(3, { message: 'Slug must be at least 3 characters long' })
})

function CreateCategoriesForm() {
  const [selectedDomains, setSelectedDomains] = useState([]) // Ensure state can hold full domain objects
  const allDomainsData = useGetAllDomains()
  const domainsData = allDomainsData?.data?.data || []
  const [isLoading, setIsLoading] = useState(false)
  const { setIsModalOpen } = useModalStore()
  const createCategoriesMutation = useCreateCategories()
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

    // Log the selected domains (this should now be the full objects with domain_id and domain_name)
    console.log('Selected Domains:', selectedDomains)

    // Prepare the categories data, use the selected domain_ids
    const categoriesData = {
      data: {
        category_name: values.category_name,
        category_desc: values.category_desc,
        category_slug: values.category_slug,
        domains: selectedDomains.map((domain) => domain.document_id).join(',') // Create a comma-separated string of document_ids
      }
    }
    console.log('===Payload:', JSON.stringify(categoriesData))

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
          <FormField
            control={form.control}
            name="domains"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Domains
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  {domainsData.length > 0 ? (
                    <MultiSelect
                      options={domainsData.map((item) => ({
                        value: item.id, // Use domain id for selection
                        label: item.domain_name
                      }))}
                      onValueChange={(selected) => {
                        const selectedDomainsData = domainsData.filter(
                          (domain) => selected.includes(domain.document_id.toString()) // Match by the selected id
                        )
                        setSelectedDomains(selectedDomainsData) // Store the selected domain objects
                        field.onChange(selected) // Pass selected domain ids to form state
                      }}
                      value={field.value || []} // Ensure the value is set correctly from form state
                      placeholder="Select Domains"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  ) : (
                    <p>No domains found</p>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
