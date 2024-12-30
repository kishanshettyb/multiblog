import { Login } from '@/app/types/commonTypes'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const login = async (data: Login) => {
  return await axiosInstance.post('auth/login', data)
}
