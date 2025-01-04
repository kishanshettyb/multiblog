import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface Props {
  title: string
  desc?: string
  styles?: string
  buttons?: boolean
  buttonTitle?: string
  buttonLink?: string
  icon?: IconType
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

function Header({ title, desc, styles, buttons, buttonTitle, buttonLink, icon: Icon }: Props) {
  return (
    <div
      className={`w-full justify-between items-center flex ${buttons ? `grid-cols-2` : `grid-cols-1`} ${styles}`}
    >
      <div>
        <h2 className="text-2xl text-slate-900 xl:text-[1.8rem] font-bold">{title}</h2>
        <p className="text-slate-400 text-sm">{desc}</p>
      </div>
      {buttons ? (
        <div>
          <Link href={buttonLink ? buttonLink : '#'}>
            <Button size="lg">
              {Icon && <Icon className="mt-[-1px]" />} {/* Render icon dynamically */}
              {buttonTitle ? buttonTitle : 'Button'}
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Header
