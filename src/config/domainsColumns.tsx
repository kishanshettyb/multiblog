import { Domain } from '@/types/commonTypes'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ShowDate from '@/components/showDate'
import useModalStore from '@/store/store'

interface RowData {
  documentId: string
  // Add other fields in your data structure if needed
}
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
    accessorKey: 'documentId',
    cell: function ActionCell({ row }: { row: { original: RowData } }) {
      const id = row.original.documentId
      const openModal = useModalStore((state) => state.openModal)

      return (
        <Button onClick={() => openModal(id)} variant="outline">
          <Edit />
          Edit
        </Button>
      )
    }
  }
]
