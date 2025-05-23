'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import useModalStore from '../store/store'

interface Props {
  title: string
  desc?: string
  styles?: string
  buttons?: boolean
  buttonTitle?: string
  buttonLink?: string
  icon?: IconType
  modalSize?: string
  modalButton?: boolean
  modalTitle?: string
  components?: React.ReactNode
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

function Header({
  title,
  desc,
  styles,
  buttons,
  buttonTitle,
  buttonLink,
  icon: Icon,
  modalButton
}: Props) {
  const { setIsModalOpen } = useModalStore()
  const handleButtonClick = () => {
    if (modalButton) {
      setIsModalOpen(true)
    }
  }

  return (
    <div
      className={`w-full justify-between items-center flex ${buttons ? `grid-cols-2` : `grid-cols-1`} ${styles}`}
    >
      <div>
        <h2 className="text-2xl text-slate-900 xl:text-[1.8rem] font-bold">{title}</h2>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
      {buttons ? (
        <div>
          {modalButton ? (
            <div>
              <Button size="lg" onClick={handleButtonClick}>
                {Icon && <Icon className="mt-[-1px]" />}
                {buttonTitle ? buttonTitle : 'Button'}
              </Button>
            </div>
          ) : (
            <Link href={buttonLink ? buttonLink : '#'}>
              <Button size="lg">
                {Icon && <Icon className="mt-[-1px]" />}
                {buttonTitle ? buttonTitle : 'Button'}
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Header
