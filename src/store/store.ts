import { create } from 'zustand'

interface ModalState {
  isModalOpen: boolean
  /* eslint-disable */
  setIsModalOpen: (isModalOpen: boolean) => void
  /* eslint-enable */
}

const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen })
}))

export default useModalStore // Default export added
