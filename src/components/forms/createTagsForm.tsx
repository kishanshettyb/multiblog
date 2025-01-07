'use client'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { z } from 'zod'
import { LoaderCircle } from 'lucide-react'
import useModalStore from '@/app/store/store'
import { useCreateTags } from '@/services/mutations/tags'

const formSchema = z.object({
  tag_name: z.string().min(3, { message: 'Tag name must be at least 3 characters long' }),
  tag_slug: z.string().min(3, { message: 'Tag slug must be at least 3 characters long' })
})

function CreateTagsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { setIsModalOpen } = useModalStore()
  const createTagsMutation = useCreateTags()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      tag_name: '',
      tag_slug: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const tagsData = {
      data: {
        tag_name: values.tag_name,
        tag_slug: values.tag_slug
      }
    }

    createTagsMutation.mutate(tagsData, {
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
          <FormField
            control={form.control}
            name="tag_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tag name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Slug(URL)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tag slug (URL)" {...field} />
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
                'Create Tag'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateTagsForm
