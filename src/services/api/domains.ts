import { Domain } from '@/types/commonTypes'
import axios from 'axios'

const token = process.env.NEXT_PUBLIC_API_TOKEN

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllDomains = async (): Promise<Domain[]> => {
  try {
    const response = await axiosInstance.get<Domain[]>(`/domains`)
    return response.data
  } catch (error) {
    console.log('Error fetching domains:', error)
    throw error
  }
}
