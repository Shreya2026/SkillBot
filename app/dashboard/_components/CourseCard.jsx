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
    <div className='shadow-sm rounded-lg border p-2  cursor-pointer mt-4'>
      <Link href={`/course/${course.courseId}`} className='flex flex-col'>
      <Image src={imageSrc} width={300} height={200} alt="Course thumbnail"
      className='rounded-lg shadow-md w-full h-[200px] 
      object-cover mt-4 rounded-lg'/>
      </Link>
      <div className='p-2'>
        <h2 className='font-medium text-lg mt-2 flex justify-between items-center'>
            {course?.courseOutput?.['Course Name'] || course?.name || 'Untitled Course'}
            <DropdownOption handleOnDelete={handleOnDelete}>
                <IoEllipsisVerticalOutline />
            </DropdownOption>
        </h2>
        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
            <h2 className='flex gap-2 items-center'><IoBookOutline />{course.courseOutput['NoOfChapters']} Chapters</h2>
            <h2 className='text-sm  text-sm'>{course.level}</h2>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
