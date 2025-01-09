import React, { useState } from 'react'
import { MultiSelect } from '../multi-select'
import { useDomains } from '@/hooks/useDomains'
import { useTags } from '@/hooks/useTags'
import { useCategories } from '@/hooks/useCategories'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

interface PostProps {
  data: {
    post_title: string
    post_status: string
    post_slug: string
    post_content: string
    domains?: never[]
    categories?: never[]
    tags?: never[]
  }
}

function PostForm() {
  const [selectedDomains, setSelectedDomains] = useState([]) // Ensure state can hold full domain objects
  const [selectedCategories, setSelectedCategories] = useState([]) // Ensure state can hold full domain objects
  const [selectedTags, setSelectedTags] = useState([]) // Ensure state can hold full domain objects
  const [postStatus] = useState('draft') // Ensure state can hold full domain objects
  //   Domain
  const { data } = useDomains()
  const domains = data
  domains.forEach((item) => {
    item.value = item.documentId
    item.label = item.domain_name
  })
  // tags
  const tags = useTags()
  const tagsData = tags?.data
  tagsData.forEach((item) => {
    item.value = item.documentId
    item.label = item.tag_name
  })
  // categories
  const categories = useCategories()
  const categoriesData = categories?.data
  categoriesData.forEach((item) => {
    item.value = item.documentId
    item.label = item.category_name
  })
  //   Form
  const formSchema = z.object({
    post_title: z.string().min(3, { message: 'Post title be at least 3 characters long' }),
    post_content: z
      .string()
      .min(3, { message: 'Post Description must be at least 3 characters long' }),
    post_slug: z.string().min(3, { message: 'Post Description must be at least 3 characters long' })
  })

  const [isLoading, setIsLoading] = useState(false)
  //   const createPostMutation = useCreatePost()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_title: '',
      post_content: '',
      post_slug: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const postData: PostProps = {
      data: {
        post_title: values.post_title,
        post_content: values.post_content,
        post_slug: values.post_slug,
        post_status: postStatus,
        domains: selectedDomains,
        categories: selectedCategories,
        tags: selectedTags
      }
    }
    console.log(JSON.stringify(postData))

    // createPostMutation.mutate(postData, {
    //   onError: () => {
    //     setIsLoading(false)
    //   },
    //   onSuccess: () => {
    //     setIsLoading(false)
    //     setIsModalOpen(false)
    //   }
    // })
  }

  return (
    <div className="flex  justify-between gap-x-4">
      <div className="border basis-8/12 rounded-xl w-full p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="post_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="post_slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter domain desc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="post_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button className="w-full" size="lg" disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                  </>
                ) : (
                  'Create Domain'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="border rounded-xl basis-4/12 p-4">
        <div className="mb-5">
          <h2 className="font-semibold text-slate-600 text-lg">Domains</h2>
          {domains?.length > 0 ? (
            <MultiSelect
              options={domains}
              onValueChange={setSelectedDomains}
              defaultValue={selectedDomains}
              placeholder="Select Domains"
              variant="inverted"
              maxCount={6}
            />
          ) : (
            <p>No domains found</p>
          )}
        </div>

        <div className="mb-5">
          <h2 className="font-semibold text-slate-600 text-lg">Categories</h2>
          {domains?.length > 0 ? (
            <MultiSelect
              options={categoriesData}
              onValueChange={setSelectedCategories}
              defaultValue={selectedCategories}
              placeholder="Select Categories"
              variant="inverted"
              maxCount={6}
            />
          ) : (
            <p>No categories found</p>
          )}
        </div>
        <div className="mb-5">
          <h2 className="font-semibold text-slate-600 text-lg">Tags</h2>
          {domains?.length > 0 ? (
            <MultiSelect
              options={tagsData}
              onValueChange={setSelectedTags}
              defaultValue={selectedTags}
              placeholder="Select Tags"
              variant="inverted"
              maxCount={6}
            />
          ) : (
            <p>No tags found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostForm
