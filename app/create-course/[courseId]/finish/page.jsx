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
import Link from 'next/link';
import { Button } from '@/components/ui/button';


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
    <div className='mx-auto max-w-5xl px-5 py-12 md:px-10'>
        <p className="eyebrow text-center">A new path begins</p>
        <h2 className='display-serif my-3 text-center text-5xl font-bold'>Your course is ready.</h2>
        <h2 className='border border-[#d8d0c2] bg-[#fffdf7] p-3 text-center text-sm text-[#68736c]'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{courseId}</h2>

        <CourseBasicInfo course={course} refreshData={() => console.log()} />
        {course && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="h-12 rounded-none bg-[#1d5b50] px-7 text-[#fffdf7] shadow-[4px_4px_0_#e4a853] hover:bg-[#294a41]">
              <Link href={`/course/${course.courseId}/start`}>
                Start Learning <span aria-hidden="true">→</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-none border-[#1d5b50] bg-transparent px-7 text-[#1d5b50] hover:bg-[#e8dfcf]">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        )}
        <h2 className='mt-8 font-bold uppercase tracking-wider text-[#1d5b50]'>Course URL:</h2>
        <h2 className='mt-2 flex items-center gap-5 border border-[#d8d0c2] bg-[#fffdf7] p-3 text-center text-sm text-[#68736c]'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{courseId}
             <FaRegCopy className='h-5 w-5 cursor-pointer' onClick={async ()=> await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${courseId}`)}/></h2>



    </div>
  )
}

export default FinishScreen;
