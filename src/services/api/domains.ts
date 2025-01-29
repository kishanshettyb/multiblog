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

export const getSingleDomain = async (domainId: string): Promise<Domain> => {
  try {
    const response = await axiosInstance.get<Domain>(`/domains/${domainId}`)
    return response.data
  } catch (error) {
    console.log('Error fetching domains:', error)
    throw error
  }
}
export const createDomains = async (data: Domain) => {
  await axiosInstance.post('domains', data)
}

export const updateDomains = async (documentId: string, data: Domain) => {
  console.log(documentId, JSON.stringify(data))
  const payload = {
    data: data
  }
  return await axiosInstance.put(`domains/${documentId}`, payload)
}
