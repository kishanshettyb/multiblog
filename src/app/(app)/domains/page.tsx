'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/header'
import { CustomDataTable } from '@/components/customDatatable'
import CreateDomainsForm from '@/components/forms/createDomainsForm'
import { useDomains } from '@/hooks/useDomains'
import { getDomainsColumns } from '@/config/domainsColumns'
import { CustomModal } from '@/components/customModal'
import useModalStore from '@/store/store'

function Domains() {
  const { data } = useDomains()
  const columns = getDomainsColumns()
  const { isModalOpen, setIsModalOpen } = useModalStore()
  const { setIsEditModalOpen, isEditModalOpen, documentId } = useModalStore()

  return (
    <div className="h-full overflow-auto ">
      <Header
        title="Domains"
        desc="Create domains"
        buttons
        buttonTitle="Create Domains"
        icon={Plus}
        modalButton
      />
      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Create Domains"
        desc="Domains"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <CreateDomainsForm />
        </div>
      </CustomModal>

      <CustomModal
        modalSize="md:max-w-[400px]"
        title="Edit Domains"
        desc="Edit Domains"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div>
          <CreateDomainsForm domainId={documentId ? documentId : null} />
        </div>
      </CustomModal>
      <CustomDataTable columns={columns} data={data} searchItem="domain_name" />
    </div>
  )
}

export default Domains
