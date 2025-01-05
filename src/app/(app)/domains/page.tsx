'use client'
import React from 'react'
import { useGetAllDomains } from '@/services/queries/domains'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal, Pen, Plus } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Header from '@/components/header'
import { CustomDataTable } from '@/components/customDatatable'
import { Button } from '@/components/ui/button'
import { Domain } from '@/types/commonTypes'
import CreateDomainsForm from '@/components/forms/createDomainsForm'

function Domains() {
  const allDomainsData = useGetAllDomains()
  const data = allDomainsData?.data?.data || []
  const columns: ColumnDef<Domain>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="uppercase">
          {moment(row.getValue('createdAt')).format('DD MMM YYYY ( hh:mm:ss A )')}
        </div>
      )
    },
    {
      accessorKey: 'publishedAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Published Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="uppercase">
          {moment(row.getValue('publishedAt')).format('DD MMM YYYY ( hh:mm:ss A )')}
        </div>
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
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                <>
                  <Pen size={10} /> Edit
                </>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return (
    <div className="h-full overflow-auto ">
      <Header
        title="Domains"
        desc="Create domains"
        buttons
        buttonTitle="Create Domains"
        icon={Plus}
        modalButton
        components={<CreateDomainsForm />}
      />
      <CustomDataTable columns={columns} data={data} searchItem="domain_name" />
    </div>
  )
}

export default Domains
