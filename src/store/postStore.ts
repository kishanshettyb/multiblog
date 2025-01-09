import { create } from 'zustand'

const usePostStore = create((set) => ({
  postId: null,
  postStatus: 'draft',
  setPostId: (postId) => set({ postId }),
  setPostStatus: (postStatus) => set({ postStatus })
}))

export default usePostStore
