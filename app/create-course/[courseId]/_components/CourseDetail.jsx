"use client"
import React from 'react'
import { IoBarChartOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";

function CourseDetail({course}) {
  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className='flex gap-2'>
            <IoBarChartOutline className='text-4xl text-primary'/>
            <div>
                <h2 className='text-xs text-gray-400'>Skill Level</h2>
                <h2 className='font-medium text-lg '>{course?.level || "Not specified"}</h2>
            </div>
        </div>
        <div className='flex gap-2'>
            <CiClock2 className='text-4xl text-primary'/>
            <div>
                <h2 className='text-xs text-gray-400'>Duration</h2>
                <h2 className='font-medium text-lg '>{course?.courseOutput?.Duration || "Not specified"}</h2>
            </div>
        </div>
        <div className='flex gap-2'>
            <IoBookOutline className='text-4xl text-primary'/>
            <div>
                <h2 className='text-xs text-gray-400'>No of Chapters</h2>
                <h2 className='font-medium text-lg '>{course?.courseOutput?.NoOfChapters || "Not specified"}</h2>
            </div>
        </div>
        <div className='flex gap-2'>
            <IoPlayCircleOutline className='text-4xl text-primary'/>
            <div>
                <h2 className='text-xs text-gray-400'>Video Included?</h2>
                <h2 className='font-medium text-lg '>{course?.includeVideo || "Not specified"}</h2>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
