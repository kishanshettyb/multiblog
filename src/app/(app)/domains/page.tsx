import { CustomModal } from '@/components/customModal'
import Header from '@/components/header'
import { Plus } from 'lucide-react'
import React from 'react'

function Domains() {
  return (
    <div>
      <Header
        title="Domains"
        desc="Create domains"
        buttons
        buttonTitle="Create Domains"
        icon={Plus}
      />
      <CustomModal />
    </div>
  )
}

export default Domains
