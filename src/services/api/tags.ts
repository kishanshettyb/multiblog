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

export const getSingleTag = async (tagId: string): Promise<Tags> => {
  try {
    const response = await axiosInstance.get<Tags>(`/tags/${tagId}`)
    return response.data
  } catch (error) {
    console.log('Error fetching tag:', error)
    throw error
  }
}

export const createTags = async (data: Tags) => {
  await axiosInstance.post('tags', data)
}

export const updateTags = async (documentId: string, data: Tags) => {
  console.log(documentId, JSON.stringify(data))
  const payload = {
    data: data
  }
  return await axiosInstance.put(`tags/${documentId}`, payload)
}
