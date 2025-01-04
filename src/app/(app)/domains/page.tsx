'use client'
import Header from '@/components/header'
import Test from '@/components/test'
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
        modalButton
        components={<Test />}
      />
    </div>
  )
}

export default Domains
