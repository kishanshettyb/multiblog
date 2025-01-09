import moment from 'moment'
import React from 'react'

interface Props {
  createdDate: Date
  updatedDate: Date
  color: string
}

function ShowDate({ createdDate, updatedDate, color }: Props) {
  return (
    <div
      className={
        color == 'green'
          ? `border-green-600 bg-green-50 lowecase flex gap-x-2 w-[150px] justify-center items-center border  rounded-lg p-2`
          : `border-orange-600 bg-orange-50 lowecase flex gap-x-2 w-[150px] justify-center items-center border  rounded-lg p-2`
      }
    >
      <div>
        <p
          className={
            color == 'green'
              ? `text-green-600 text-xs  font-semibold`
              : `text-orange-600 text-xs  font-semibold`
          }
        >
          {moment(createdDate).format('DD MMM YY')}
        </p>
      </div>
      <div>
        <p className={color == 'green' ? `text-green-600 text-xs` : `text-orange-600 text-xs`}>
          {moment(updatedDate).format(' hh:mm:ss A ')}
        </p>
      </div>
    </div>
  )
}

export default ShowDate
