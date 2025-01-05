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
import { useCreateDomain } from '@/services/mutations/domain'
import { LoaderCircle } from 'lucide-react'

const domainNameRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
const formSchema = z.object({
  domain_name: z
    .string()
    .min(3, { message: 'Domain name must be at least 3 characters long' })
    .max(255, { message: 'Domain name cannot exceed 255 characters' })
    .regex(domainNameRegex, {
      message: 'Domain name must be a valid domain (e.g., example.com)'
    }),
  domain_desc: z.string().min(3, { message: 'Description must be at least 3 characters long' })
})

function CreateDomainsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const createDomainsMutation = useCreateDomain()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      domain_name: '',
      domain_desc: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const domainsData = {
      data: {
        domain_name: values.domain_name,
        domain_desc: values.domain_desc
      }
    }

    createDomainsMutation.mutate(domainsData, {
      onError: () => {
        setIsLoading(false)
      },
      onSuccess: () => {
        setIsLoading(false)
      }
    })
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
                <FormLabel>Domain Desc</FormLabel>
                <FormControl>
                  <Input placeholder="Enter domain desc" {...field} />
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
  )
}

export default CreateDomainsForm
