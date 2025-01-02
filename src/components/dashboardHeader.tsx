import React from 'react'
import { Profile } from './profile'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function DashboardHeader() {
  return (
    <div className="px-6 py-2 items-center flex w-full justify-between border   border-x-0 border-t-0">
      <div>
        <div>
          <div className="flex opacity-60 w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="search post" />
            <Button type="submit" variant="ghost" className="border">
              <Search />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <>
          <Profile />
        </>
      </div>
    </div>
  )
}

export default DashboardHeader
