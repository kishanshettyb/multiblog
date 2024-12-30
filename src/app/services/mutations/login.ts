import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const LOGIN_URL = process.env.NEXT_PUBLIC_BASE_URL

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (loginData) => {
      return axios.post(LOGIN_URL, loginData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error) => {
      console.log('failed' + JSON.stringify(error.response))
    }
  })
}
