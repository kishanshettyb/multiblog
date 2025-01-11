import { create } from 'zustand'

/* eslint-disable */
export type PostStoreState = {
  postId: string | null
  postStatus: 'draft' | 'published'

  selectedDomains: string[] | undefined
  selectedCategories: string[] | undefined
  selectedTags: string[] | undefined

  setPostId: (postId: string | null) => void
  setPostStatus: (postStatus: 'draft' | 'published') => void

  setSelectedDomains: (selectedDomains: string[] | undefined) => void
  setSelectedCategories: (selectedCategories: string[] | undefined) => void
  setSelectedTags: (selectedTags: string[] | undefined) => void
  resetStore: () => void
}
/* eslint-enable */

const usePostStore = create<PostStoreState>((set) => ({
  postId: null,
  postStatus: 'draft',
  selectedDomains: undefined,
  selectedCategories: undefined,
  selectedTags: undefined,

  setPostId: (postId) => set({ postId }),
  setPostStatus: (postStatus) => set({ postStatus }),
  setSelectedDomains: (selectedDomains) => set({ selectedDomains }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setSelectedTags: (selectedTags) => set({ selectedTags }),
  resetStore: () =>
    set({
      postId: null,
      postStatus: 'draft',
      selectedDomains: undefined,
      selectedCategories: undefined,
      selectedTags: undefined
    })
}))

export default usePostStore
