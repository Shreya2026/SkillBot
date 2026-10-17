'use client'
import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course ,refreshData,edit=true }) {
    return (
        <div className='mt-3'>
            <h2 className='display-serif mt-10 text-3xl font-bold'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.Chapters?.map((chapter, index) => (
                    <div key={chapter["Chapter Name"] || index} className='mb-2 flex items-center justify-between border-b border-[#d8d0c2] bg-[#fffdf7]/70 p-5 transition-colors hover:bg-[#fffdf7]'>
                        <div className='flex gap-5 item-center mb-4'>
                            <h3 className='grid h-10 w-10 flex-none place-items-center bg-[#1d5b50] text-center text-[#fffdf7]'> {String(index + 1).padStart(2, '0')}</h3>
                            <div>
                                <h2 className='font-medium text-lg'>{chapter["Chapter Name"]} 
                                    {edit&&<EditChapters index={index} course={course} refreshData={() => refreshData(true)} />}</h2>
                                <p className='text-sm text-gray-400'>{chapter['About'] || "No description available."}</p>
                                <p className='flex gap-2 text-sm text-gray-400'><CiClock2 className='mt-1' /> {chapter['Duration'] || "Unknown"}</p>
                            </div>
                        </div>
                        <FaRegCheckCircle className='flex-none text-2xl text-[#e4a853]'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList
