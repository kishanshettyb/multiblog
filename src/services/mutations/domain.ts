import { Domain } from '@/types/commonTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDomains } from '../api/domains'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

export function useCreateDomain() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: Domain) => createDomains(data),
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
        title: 'Domain created successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['domains']
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
            title: 'Unable to create domain',
            description:
              message == 'This attribute must be unique' ? 'Domain name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to create domain',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['domains']
        })
      }
    }
  })
}
