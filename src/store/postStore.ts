import { create } from 'zustand'

/* eslint-disable */
export type PostStoreState = {
  postId: string | null
  postStatus: 'draft' | 'published'
  setPostId: (postId: string | null) => void
  setPostStatus: (postStatus: 'draft' | 'published') => void
}
/* eslint-enable */

const usePostStore = create<PostStoreState>((set) => ({
  postId: null,
  postStatus: 'draft',
  setPostId: (postId) => set({ postId }),
  setPostStatus: (postStatus) => set({ postStatus })
}))

export default usePostStore
