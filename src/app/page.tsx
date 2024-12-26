'use client'
import { LoginForm } from '@/components/login'
import Image from 'next/image'
import React from 'react'

function Page() {
  return (
    <div className="flex h-screen w-screen justify-center items-center  ">
      <div className="w-1/2">
        <Image
          src="/images/login.jpg"
          width="1080"
          height="1080"
          alt="multiblog"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default Page
