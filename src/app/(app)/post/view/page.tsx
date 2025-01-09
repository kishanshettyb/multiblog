'use client'
import { CustomDataTable } from '@/components/customDatatable'
import Header from '@/components/header'
import { getPostsColumns } from '@/config/postsColumns'
import { usePosts } from '@/hooks/usePosts'
import { Plus } from 'lucide-react'
import React from 'react'

function Page() {
  const { data } = usePosts()
  const columns = getPostsColumns()

  return (
    <div>
      <Header
        title="Post Lists"
        desc="View all posts"
        buttons
        buttonTitle="Create Post"
        buttonLink="/post"
        icon={Plus}
      />
      <CustomDataTable columns={columns} data={data} searchItem="post_title" />
    </div>
  )
}

export default Page
