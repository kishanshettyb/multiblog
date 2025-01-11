import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { createPost, updatePost } from '../api/createPost'
import { Posts } from '@/types/commonTypes'

export function useCreatePost() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: { data: Posts }) => createPost(data),
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
        title: 'Post created successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['post']
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
            title: 'Unable to create post',
            description:
              message == 'This attribute must be unique' ? 'Post name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to create post',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['posts']
        })
      }
    }
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: Posts }) => updatePost(postId, data),

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
        title: 'Post updated successfully'
      })
      queryClient.invalidateQueries({
        queryKey: ['post']
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
            title: 'Unable to update post',
            description:
              message == 'This attribute must be unique' ? 'Post name already exist' : message
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Unable to update post',
            description: 'An unknown error occurred.'
          })
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['posts']
        })
      }
    }
  })
}
