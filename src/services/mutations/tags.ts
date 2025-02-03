import { Tags } from '@/types/commonTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { createTags, updateTags } from '../api/tags'

export function useCreateTags() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: Tags) => createTags(data),
    onMutate: () => {
      console.log('mutate')
    },
    onError: () => {
      console.log('error')
    },
    onSuccess: () => {
      console.log('success')
      toast({
        variant: 'default',
        title: 'Tags created successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['tags']
      })
    },
    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.error.message || 'An error occurred during creation.'
          const errorMessages = errorResponse.error.details.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('\n')
          toast({
            variant: 'destructive',
            title: 'Unable to create tags',
            description:
              message == 'This attribute must be unique' ? 'Tag name already exist' : message
          })
          toast({
            variant: 'destructive',
            title: 'Unable to create tags',
            description: errorMessages
          })
          console.log(errorMessages)
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to create tag',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['tags']
        })
      }
    }
  })
}

export function useUpdateTags() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ tagId, data }: { tagId: string; data: Tags }) => updateTags(tagId, data),

    onMutate: () => {
      console.log('mutate')
    },
    onError: () => {
      console.log('error')
    },
    onSuccess: () => {
      console.log('success')
      toast({
        variant: 'default',
        title: 'Tag updated successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['tags']
      })
    },
    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.error.message || 'An error occurred during creation.'
          toast({
            variant: 'destructive',
            title: 'Unable to update tag',
            description:
              message == 'This attribute must be unique' ? 'tag name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to update tag',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['tags']
        })
      }
    }
  })
}
