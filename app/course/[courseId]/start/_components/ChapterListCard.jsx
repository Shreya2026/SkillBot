import React from 'react'
import { FaRegClock } from "react-icons/fa6";

function ChapterListCard({chapter,index}) {
  return (
    <div>
    <div className='grid grid-cols-5 items-center p-4'>
      <div>
         <h2 className='grid h-8 w-8 place-items-center bg-[#e4a853] text-center text-sm font-bold text-[#1d2924]'>{String(index+1).padStart(2, '0')}</h2>
      </div>
      <div className='col-span-4'>
            <h2 className='font-medium text-[#fffdf7]'>{chapter?.['Chapter Name']}</h2>
            <h2 className='flex items-center gap-2 text-sm text-[#9eb1a7]'><FaRegClock />{chapter?.['Duration']}</h2>
      </div>
    </div>
    </div>
  )
}

export default ChapterListCard
