import { Categories, Domain } from '@/types/commonTypes'
import axios from 'axios'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllCategories = async (): Promise<Categories[]> => {
  try {
    const response = await axiosInstance.get<Categories[]>(`/categories`)
    return response.data
  } catch (error) {
    console.log('Error fetching domains:', error)
    throw error
  }
}

export const createCategories = async (data: Domain) => {
  await axiosInstance.post('categories', data)
}
