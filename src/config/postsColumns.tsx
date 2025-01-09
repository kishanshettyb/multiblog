import { Posts } from '@/types/commonTypes'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pen } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ShowDate from '@/components/showDate'
import Link from 'next/link'

export const getPostsColumns = (): ColumnDef<Posts>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'post_title',
    header: 'Post Title',
    cell: ({ row }) => <div className="lowercase">{row.getValue('post_title')}</div>
  },
  {
    accessorKey: 'post_slug',
    header: 'Post URL',
    cell: ({ row }) => (
      <div className="lowercase">
        <Link target="_blank" href="#">
          {row.getValue('post_slug')}
        </Link>
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Created Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <ShowDate
        color="green"
        createdDate={row.getValue('createdAt')}
        updatedDate={row.getValue('createdAt')}
      />
    )
  },
  {
    accessorKey: 'publishedAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Published Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <ShowDate
        color="orange"
        createdDate={row.getValue('publishedAt')}
        updatedDate={row.getValue('publishedAt')}
      />
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-4">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              <>
                <Pen size={10} /> Edit
              </>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
