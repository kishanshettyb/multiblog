import { Posts } from '@/types/commonTypes'
import axios from 'axios'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllPosts = async (): Promise<Posts[]> => {
  try {
    const response = await axiosInstance.get<Posts[]>(`/posts?populate=*`)
    return response.data
  } catch (error) {
    console.log('Error fetching posts:', error)
    throw error
  }
}

export const createPost = async (data: Posts) => {
  return await axiosInstance.post('posts', data)
}

export const updatePost = async (postId: string, data: Posts) => {
  const payload = {
    data: data
  }

  return await axiosInstance.put(`posts/${postId}`, payload)
}
