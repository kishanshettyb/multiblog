import React, { useEffect, useState } from 'react'
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
import EditorForm from '@/components/editor'

interface PostProps {
  data: {
    post_title: string
    post_status: string
    post_slug: string
    post_content: string
    domains: string[] // Updated type
    categories: string[] // Updated type
    tags: string[] // Updated type
  }
}

type Option = {
  value: string
  label: string
}

const PostForm = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]) // Changed to hold document IDs
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]) // Changed to hold document IDs
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // Changed to hold document IDs
  const [postStatus] = useState<'draft' | 'published'>('draft') // Fixed type

  // content editor
  const [content, setContent] = useState('')
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)

  useEffect(() => {
    setIsEditorLoaded(true) // Set to true once the component is mounted on the client
  }, [])

  // Domain Data
  const { data: domainData } = useDomains()
  const domains: Option[] =
    domainData?.map((item) => ({
      value: item.documentId,
      label: item.domain_name
    })) || []

  // Tags Data
  const { data: tagData } = useTags()
  const tagsData: Option[] =
    tagData?.map((item) => ({
      value: item.documentId,
      label: item.tag_name
    })) || []

  // Categories Data
  const { data: categoryData } = useCategories()
  const categoriesData: Option[] =
    categoryData?.map((item) => ({
      value: item.documentId,
      label: item.category_name
    })) || []

  // Form Schema
  const formSchema = z.object({
    post_title: z.string().min(3, { message: 'Post title must be at least 3 characters long' }),
    post_slug: z.string().min(3, { message: 'Post URL must be at least 3 characters long' })
  })

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_title: '',
      post_slug: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const postData: PostProps = {
      data: {
        post_title: values.post_title,
        post_content: content,
        post_slug: values.post_slug,
        post_status: postStatus,
        domains: selectedDomains,
        categories: selectedCategories,
        tags: selectedTags
      }
    }
    console.log(JSON.stringify(postData))

    // You can call your mutation function here like:
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
    <div className="flex justify-between gap-x-4">
      <div className="basis-9/12 mb-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="border rounded-xl w-full p-4 space-y-4">
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
                      <Input placeholder="Enter post slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm mt-4">Post Content</p>
              {isEditorLoaded && <EditorForm value={content} onChange={handleEditorChange} />}
            </div>
            <div className="flex justify-end mb-10">
              <Button size="lg" disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                  </>
                ) : (
                  'Save Post'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="basis-3/12">
        <div className="border rounded-xl p-4">
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
            {categoriesData?.length > 0 ? (
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
            {tagsData?.length > 0 ? (
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
    </div>
  )
}

export default PostForm
