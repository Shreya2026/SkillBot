import React from 'react'
import { FaRegClock } from "react-icons/fa6";

function ChapterListCard({chapter,index}) {
  return (
    <div className='border-b'>
    <div className='grid grid-cols-5 p-3 items-center border-b shadow-sm'>
      <div>
         <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index+1}</h2>
      </div>
      <div className='col-span-4'>
            <h2 className='font-medium text-black'>{chapter?.['Chapter Name']}</h2>
            <h2 className='flex items-center gap-2 text-sm text-gray-600'><FaRegClock />{chapter?.['Duration']}</h2>
      </div>
    </div>
    </div>
  )
}

export default ChapterListCard
