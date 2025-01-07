'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/header'
import { CustomDataTable } from '@/components/customDatatable'
import CreateDomainsForm from '@/components/forms/createDomainsForm'
import { useDomains } from '@/hooks/useDomains'
import { getDomainsColumns } from '@/config/domainsColumns'

function Domains() {
  const { data } = useDomains()
  const columns = getDomainsColumns()
  return (
    <div className="h-full overflow-auto ">
      <Header
        title="Domains"
        desc="Create domains"
        buttons
        buttonTitle="Create Domains"
        icon={Plus}
        modalSize="md:max-w-[400px]"
        modalButton
        modalTitle="Create Domain"
        components={<CreateDomainsForm />}
      />
      <CustomDataTable columns={columns} data={data} searchItem="domain_name" />
    </div>
  )
}

export default Domains
