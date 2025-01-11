import React, { useEffect, useState } from 'react'
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
import { FilePenLine, Globe, LoaderCircle, Save } from 'lucide-react'
import EditorForm from '@/components/editor'
import { useCreatePost, useUpdatePost } from '@/services/mutations/post'
import DomainsCategories from '../domainsCategories'
import usePostStore from '@/store/postStore'
import { PostProps } from '@/types/commonTypes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const generateSlug = (title: string) => title.trim().toLowerCase().replace(/\s+/g, '-')
const PostForm = () => {
  const [content, setContent] = useState('')
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPublishLoading, setIsPublishLoading] = useState(false)
  const {
    selectedDomains,
    selectedCategories,
    selectedTags,
    postStatus,
    postId,
    setPostId,
    setPostStatus
  } = usePostStore()
  const createPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()

  const formSchema = z.object({
    post_title: z.string().min(3, { message: 'Post title must be at least 3 characters long' }),
    post_slug: z.string().min(3, { message: 'Post URL must be at least 3 characters long' })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { post_title: '', post_slug: '' }
  })

  const { watch, setValue, trigger } = form
  const postTitle = watch('post_title')

  useEffect(() => {
    if (postTitle) setValue('post_slug', generateSlug(postTitle))
  }, [postTitle, setValue])

  useEffect(() => {
    setIsEditorLoaded(true)
  }, [])

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  const handlePublish = async () => {
    const isValid = await trigger()
    if (isValid) {
      setIsPublishLoading(true)
      form.handleSubmit(onSubmit)()
    }
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const postData: PostProps = {
      data: {
        post_title: values.post_title,
        post_content: content,
        post_slug: values.post_slug,
        post_status: postStatus,
        domains: selectedDomains,
        category: selectedCategories,
        tags: selectedTags
      }
    }

    if (postId) {
      updatePostMutation.mutate(
        { postId, data: postData.data },
        {
          onError: () => {
            setIsLoading(false)
            setIsPublishLoading(false)
          },
          onSuccess: (data) => {
            setIsLoading(false)
            setIsPublishLoading(false)
            setPostId(data?.data?.data.documentId)
            setPostStatus(data?.data?.data.post_status)
          }
        }
      )
    } else {
      createPostMutation.mutate(postData, {
        onError: () => {
          setIsLoading(false)
          setIsPublishLoading(false)
        },
        onSuccess: (data) => {
          setIsLoading(false)
          setIsPublishLoading(false)
          setPostId(data?.data?.data.documentId)
          setPostStatus(data?.data?.data.post_status)
        }
      })
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between my-5">
        <h2 className="font-semibold text-[1.5rem]">Post</h2>
        <div className="flex gap-x-2">
          <div className="flex justify-start gap-x-2 items-center ">
            <div>
              <p className="font-semibold opacity-50">Status: </p>
            </div>
            <div>
              <Select value={postStatus} onValueChange={setPostStatus}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="shadow-lg shadow-green-100"
            variant="outline"
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <>
                <LoaderCircle size={18} color="white" className="animate-spin" /> Loading...
              </>
            ) : postId ? (
              <>
                <FilePenLine className="-mt-[2px]" />
                Update Post
              </>
            ) : (
              <>
                <Save className="-mt-[2px]" />
                Save Post
              </>
            )}
          </Button>
          <Button variant="default" onClick={handlePublish} disabled={isPublishLoading}>
            {isPublishLoading ? (
              <>
                <LoaderCircle size={18} color="white" className="animate-spin" /> Loading...
              </>
            ) : (
              <>
                <Globe />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-x-4">
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
                      <LoaderCircle size={18} color="white" className="animate-spin" /> Loading...
                    </>
                  ) : postId ? (
                    'Update Post'
                  ) : (
                    'Save Post'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="basis-3/12">
          <DomainsCategories />
        </div>
      </div>
    </div>
  )
}

export default PostForm
