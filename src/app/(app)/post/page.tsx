'use client'
import PostForm from '@/components/forms/postForm'
import Header from '@/components/header'
import { Plus } from 'lucide-react'
import React from 'react'

function Post() {
  return (
    <div className="h-full overflow-auto ">
      <Header
        styles="mb-5"
        title="Post"
        desc=""
        buttons={false}
        buttonTitle="Create Domains"
        icon={Plus}
        modalSize="md:max-w-[400px]"
        modalButton
        modalTitle="Create Domain"
      />
      <PostForm />
    </div>
  )
}

export default Post
