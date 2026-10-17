import { Placeholder } from 'drizzle-orm'
import React from 'react'
import Image from 'next/image';
import { IoBookOutline } from "react-icons/io5";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import DropdownOption from './DropdownOption';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


function CourseCard({course, refreshData}) {
    const imageSrc = course?.image || '/placeholder.png';
    const handleOnDelete=async ()=>{
        const response=await db.delete(CourseList).where(eq(CourseList.id, course.id)).
        returning({id:CourseList.id})
        if(response) {
            refreshData();
        }
    }

  return (
    <div className='group mt-4 cursor-pointer border border-[#d8d0c2] bg-[#fffdf7] p-2 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_#e4a853]'>
      <Link href={`/course/${course.courseId}`} className='flex flex-col'>
      <Image src={imageSrc} width={300} height={200} alt="Course thumbnail"
      className='mt-4 h-[200px] w-full object-cover grayscale transition-all group-hover:grayscale-0'/>
      </Link>
      <div className='p-2'>
        <h2 className='mt-2 flex items-center justify-between font-medium text-lg'>
            {course?.courseOutput?.['Course Name'] || course?.name || 'Untitled Course'}
            <DropdownOption handleOnDelete={handleOnDelete}>
                <IoEllipsisVerticalOutline />
            </DropdownOption>
        </h2>
        <p className='my-1 text-sm uppercase tracking-wider text-[#b54e3b]'>{course?.category}</p>
        <div className='flex items-center justify-between'>
            <h2 className='flex gap-2 items-center'><IoBookOutline />{course.courseOutput['NoOfChapters']} Chapters</h2>
            <h2 className='text-sm  text-sm'>{course.level}</h2>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
