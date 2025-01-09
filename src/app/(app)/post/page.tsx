'use client'
import PostForm from '@/components/forms/postForm'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function Post() {
  const [status] = useState<'draft' | 'published'>('draft') // Assuming status is tracked here

  return (
    <div className="h-full overflow-auto ">
      <div className="w-full flex justify-between mb-5">
        <div>
          <h2 className="font-semibold text-[1.5rem]">Post</h2>
        </div>
        <div className="flex justify-between gap-x-2 ">
          <div className="border border-slate-100 bg-slate-100 rounded-lg px-4 py-2 text-sm">
            Status:{' '}
            <p className={`inline ${status == 'published' ? `text-green-600` : `text-red-600`}`}>
              {status ? status : 'Draft'}
            </p>
          </div>
          <Button variant="outline">Save</Button>
          <Button variant="default">Publish</Button>
        </div>
      </div>
      <PostForm />
    </div>
  )
}

export default Post
