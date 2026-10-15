'use client'
import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course ,refreshData,edit=true }) {
    return (
        <div className='mt-3'>
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.Chapters?.map((chapter, index) => (
                    <div key={chapter["Chapter Name"] || index} className='p-5 border rouned-lg mb-2 flex items-center justify-between'>
                        <div className='flex gap-5 item-center mb-4'>
                            <h3 className='bg-primary h-10 w-10 text-black rounded-full text-center p-2 flex-none'> {index + 1}</h3>
                            <div>
                                <h2 className='font-medium text-lg'>{chapter["Chapter Name"]} 
                                    {edit&&<EditChapters index={index} course={course} refreshData={() => refreshData(true)} />}</h2>
                                <p className='text-sm text-gray-400'>{chapter['About'] || "No description available."}</p>
                                <p className='flex gap-2 text-sm text-gray-400'><CiClock2 className='mt-1' /> {chapter['Duration'] || "Unknown"}</p>
                            </div>
                        </div>
                        <FaRegCheckCircle className='text-3xl text-gray-500 flex-none'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList
