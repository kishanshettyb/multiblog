import { Categories } from '@/types/commonTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { createCategories, updateCategories } from '../api/categories'

export function useCreateCategories() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: Categories) => createCategories(data),
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
        title: 'Category created successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['categories']
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.error.message || 'An error occurred during creation.'
          toast({
            variant: 'destructive',
            title: 'Unable to create category',
            description:
              message == 'This attribute must be unique' ? 'Category name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to create category',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['categories']
        })
      }
    }
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: Categories }) =>
      updateCategories(categoryId, data),

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
        title: 'Category updated successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['categories']
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
            title: 'Unable to update category',
            description:
              message == 'This attribute must be unique' ? 'category name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to update category',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['categories']
        })
      }
    }
  })
}
