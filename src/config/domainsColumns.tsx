import { Domain } from '@/types/commonTypes'
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

export const getDomainsColumns = (): ColumnDef<Domain>[] => [
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
    accessorKey: 'domain_name',
    header: 'Domain Name',
    cell: ({ row }) => <div className="lowercase">{row.getValue('domain_name')}</div>
  },
  {
    accessorKey: 'domain_desc',
    header: 'Description',
    cell: ({ row }) => <div className="lowercase">{row.getValue('domain_desc')}</div>
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
