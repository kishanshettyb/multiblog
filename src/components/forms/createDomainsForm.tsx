'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
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
import { useCreateDomain, useUpdateDomain } from '@/services/mutations/domain'
import { LoaderCircle } from 'lucide-react'
import useModalStore from '../../store/store'
import { Textarea } from '../ui/textarea'
import { useGetSingeDomain } from '@/services/queries/domains'

const domainNameRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
const formSchema = z.object({
  domain_name: z
    .string()
    .min(3, { message: 'Domain name must be at least 3 characters long' })
    .max(255, { message: 'Domain name cannot exceed 255 characters' })
    .regex(domainNameRegex, {
      message: 'Domain name must be a valid domain (e.g., example.com)'
    }),
  domain_desc: z.string().min(3, { message: 'Description must be at least 3 characters long' }),
  meta_description: z
    .string()
    .min(3, { message: 'Meta Description must be at least 3 characters long' }),
  meta_keywords: z.string().min(3, { message: 'Meta Keywords must be at least 3 characters long' })
})

const CreateDomainsForm: React.FC<{ domainId?: string | null }> = ({ domainId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setIsModalOpen, setIsEditModalOpen } = useModalStore()
  const createDomainsMutation = useCreateDomain()
  const updateDomainsMutation = useUpdateDomain(domainId)
  const { data: singleDomainsData } = useGetSingeDomain(domainId)
  const singleDomainData = singleDomainsData?.data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      domain_name: '',
      domain_desc: '',
      meta_description: '',
      meta_keywords: ''
    }
  })

  useEffect(() => {
    if (domainId && singleDomainData) {
      const currentValues = form.getValues()
      const newValues = {
        domain_name: singleDomainData.domain_name || '',
        domain_desc: singleDomainData.domain_desc || '',
        meta_description: singleDomainData.meta_description || '',
        meta_keywords: singleDomainData.meta_keywords
      }

      // Only reset if current values are different from new values
      if (
        currentValues.domain_name !== newValues.domain_name ||
        currentValues.domain_desc !== newValues.domain_desc ||
        currentValues.meta_description !== newValues.meta_description ||
        currentValues.meta_keywords !== newValues.meta_keywords
      ) {
        form.reset(newValues)
      }
    }
  }, [domainId, singleDomainData, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const domainsData = {
      data: {
        domain_name: values.domain_name,
        domain_desc: values.domain_desc,
        meta_description: values.meta_description,
        meta_keywords: values.meta_keywords
      }
    }

    if (domainId !== undefined && domainId !== null) {
      updateDomainsMutation.mutate(
        { domainId, data: domainsData.data },
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
      createDomainsMutation.mutate(domainsData, {
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
          <FormField
            control={form.control}
            name="domain_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter domain name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter domain desc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Domain meta description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Domain Keywords"
                    className="resize-none"
                    {...field}
                    onChange={(e) => {
                      const updatedValue = e.target.value.replace(/\s+/g, ',')
                      field.onChange(updatedValue)
                    }}
                  />
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
              ) : domainId ? (
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

export default CreateDomainsForm
