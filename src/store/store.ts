import { create } from 'zustand'
/* eslint-disable */
export type ModalState = {
  isModalOpen: boolean
  isEditModalOpen: boolean
  documentId: string | null
  openModal: (id: string | undefined) => void
  setIsModalOpen: (isModalOpen: boolean) => void
  setIsEditModalOpen: (isModalOpen: boolean) => void
  closeModal: () => void
}
/* eslint-enable */

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  isEditModalOpen: false,
  documentId: null,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setIsEditModalOpen: (isEditModalOpen) => set({ isEditModalOpen }),
  openModal: (id) => set({ isEditModalOpen: true, documentId: id }),
  closeModal: () => set({ isEditModalOpen: false, documentId: null })
}))

export default useModalStore
