import { useGetAllPosts } from '@/services/queries/posts'
import { Posts } from '@/types/commonTypes'

export const usePosts = () => {
  const allPostsData = useGetAllPosts()
  const data: Posts[] = allPostsData?.data?.data || []

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    return dateB.getTime() - dateA.getTime()
  })

  return { data: sortedData }
}
