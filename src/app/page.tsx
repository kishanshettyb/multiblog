'use client'
import { LoginForm } from '@/components/login'
import Image from 'next/image'
import React from 'react'

function Page() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen justify-center items-center">
      <div className="w-full h-[40%] md:h-full md:w-1/2">
        <Image
          src="/images/login.jpg"
          width="1080"
          height="1080"
          alt="multiblog"
          className="w-full h-full  md:h-screen object-cover object-top"
        />
      </div>
      <div className="w-full  h-[60%]  md:w-1/2  flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default Page
