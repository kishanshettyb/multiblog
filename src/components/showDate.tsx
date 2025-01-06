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
      className={`lowecase flex gap-x-2 w-[150px] justify-center items-center border border-${color}-600 bg-${color}-50 rounded-lg p-2`}
    >
      <div>
        <p className={`text-xs text-${color}-600 font-semibold`}>
          {moment(createdDate).format('DD MMM YY')}
        </p>
      </div>
      <div>
        <p className={`text-xs text-${color}-600`}>{moment(updatedDate).format(' hh:mm:ss A ')}</p>
      </div>
    </div>
  )
}

export default ShowDate
