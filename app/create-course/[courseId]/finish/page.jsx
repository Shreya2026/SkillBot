"use client"
import React from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import {use} from 'react';
import { FaRegCopy } from "react-icons/fa";


function FinishScreen({params}) {
    const { courseId } = use(params);
    const [course,setCourse]=useState();
    const {user}=useUser();
    const router=useRouter();
    useEffect(() => {
        if (courseId) {
          GetCourse();
        }
      }, [courseId, user]);
      const GetCourse = async () => {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, courseId),
              eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
            )
          );
        console.log(result);
        setCourse(result[0]);
      };
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-center font-bold text-2xl my-3'>Congrats! Your Course is Ready</h2>
        <h2 className='text-center text-gray-400 border p-2 round'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{courseId}</h2>

        <CourseBasicInfo course={course} refreshData={() => console.log()} />
        <h2 className='mt-3'>Course URL:</h2>
        <h2 className='text-center text-gray-400 border p-2 round mt-2 flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{courseId}
             <FaRegCopy className='h-5 w-5 cursor-pointer' onClick={async ()=> await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${courseId}`)}/></h2>



    </div>
  )
}

export default FinishScreen;
