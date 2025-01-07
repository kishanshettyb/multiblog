import { Tags } from '@/types/commonTypes'
import axios from 'axios'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllTags = async (): Promise<Tags[]> => {
  try {
    const response = await axiosInstance.get<Tags[]>(`/tags`)
    return response.data
  } catch (error) {
    console.log('Error fetching tags:', error)
    throw error
  }
}

export const createTags = async (data: Tags) => {
  await axiosInstance.post('tags', data)
}
