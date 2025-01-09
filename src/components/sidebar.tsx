import {
  BellRing,
  Blocks,
  ChartLine,
  ChevronDown,
  Globe2,
  Images,
  Layers,
  LayoutDashboard,
  MessageCircle,
  Pencil,
  Plus,
  Settings,
  Tags,
  Users,
  View
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

function Sidebar() {
  return (
    <div className="border hidden md:block w-[250px]  pt-2 px-4 pb-2">
      <div className="flex border border-slate-100 opacity-100 px-2 py-2 rounded-md  gap-x-2 items-center justify-start">
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
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <LayoutDashboard size={20} />
                </div>
                <div>Dashboard</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/domains">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Globe2 size={20} />
                </div>
                <div>Domains</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/categories">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Layers size={20} />
                </div>
                <div>Categories</div>
              </div>
            </Link>
          </li>
          <li>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="flex justify-between w-full gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                  <div className="flex justify-start items-center gap-x-2">
                    <div>
                      <Pencil size={20} />
                    </div>
                    <div>Post</div>
                  </div>
                  <div>
                    <ChevronDown size={18} className="opacity-50" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-5">
                  <Link href="/post">
                    <div className="flex w-full justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                      <div>
                        <Plus size={20} />
                      </div>
                      <div>Create Post</div>
                    </div>
                  </Link>
                  <Link href="/post/view">
                    <div className="flex  w-full justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                      <div>
                        <View size={20} />
                      </div>
                      <div>View Post</div>
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li>
            <Link href="/tags">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Tags size={20} />
                </div>
                <div>Tags</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Users size={20} />
                </div>
                <div>Users</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <MessageCircle size={20} />
                </div>
                <div>Comments</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Images size={20} />
                </div>
                <div>media library</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <ChartLine size={20} />
                </div>
                <div>Analytics</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex justify-start gap-x-2 items-center border border-slate-100 opacity-80 p-2 mb-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:opacity-100">
                <div>
                  <Settings size={20} />
                </div>
                <div>settings</div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
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
