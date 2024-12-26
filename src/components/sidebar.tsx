import {
  BellRing,
  Blocks,
  ChartLine,
  Images,
  Layers,
  LayoutDashboard,
  Plus,
  Settings,
  Tags
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className="border   pt-2 px-4 pb-2">
      <div className="flex border border-slate-100 opacity-80 px-2 py-2 rounded-md  gap-x-2 items-center justify-start">
        <div className="bg-slate-950 rounded-lg w-[32px] h-[32px] flex justify-center items-center">
          <Blocks size={20} color="white" />
        </div>
        <div>
          <p className="font-semibold text-xl">multiblog</p>
        </div>
      </div>
      <div className="mt-5">
        <ul>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <LayoutDashboard size={20} />
                </div>
                <div>Dashboard</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Plus size={20} />
                </div>
                <div>Post</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Layers size={20} />
                </div>
                <div>Categories</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Tags size={20} />
                </div>
                <div>tags</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Images size={20} />
                </div>
                <div>media library</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <ChartLine size={20} />
                </div>
                <div>Analytics</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Settings size={20} />
                </div>
                <div>settings</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <BellRing size={20} />
                </div>
                <div>Notification</div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
