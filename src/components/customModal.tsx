'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  title: string
  desc?: string
  size?: string
  children: React.ReactNode
}

export function CustomModal({ isOpen, onClose, title, desc, children }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
