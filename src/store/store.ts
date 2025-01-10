import { create } from 'zustand'
/* eslint-disable */
export type ModalState = {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}
/* eslint-enable */

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen })
}))

export default useModalStore
