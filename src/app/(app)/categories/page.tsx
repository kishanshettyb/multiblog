'use client'
import Header from '@/components/header'
import Test from '@/components/test'
import { Layers2 } from 'lucide-react'
import React from 'react'

function Categories() {
  return (
    <div>
      <Header
        title="Categories"
        desc=""
        icon={Layers2}
        buttons
        buttonTitle="Create Category"
        modalButton
        modalTitle="Crete Categories"
        components={<Test />}
      />
    </div>
  )
}

export default Categories
