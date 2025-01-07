import { Tags } from '@/types/commonTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { createTags } from '../api/tags'

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
          toast({
            variant: 'destructive',
            title: 'Unable to create tags',
            description:
              message == 'This attribute must be unique' ? 'Tag name already exist' : message
          })
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
