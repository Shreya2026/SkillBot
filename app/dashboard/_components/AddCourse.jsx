"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCourseListContext } from '../../_context/UserCourseListContext';
import { useContext } from 'react';


function AddCourse() {
    const {user} = useUser();
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext);
  return (
    <div className='mb-14 flex flex-col items-start justify-between gap-6 border-b border-[#d8d0c2] pb-10 md:flex-row md:items-end'>
      <div >
        <p className="eyebrow">Your curriculum, your pace</p>
        <h2 className='display-serif mt-2 text-5xl font-bold'>Make something worth learning.</h2>
        <p className='mt-3 max-w-xl text-sm text-[#68736c]'>Create a focused course with AI, then shape every chapter before you begin.</p>
      </div>

      <Link href={userCourseList.length >= 5 ?'/dashboard/upgrade': '/create-course'  }>
        <Button className="h-12 rounded-none bg-[#b54e3b] px-6 text-[#fffdf7] hover:bg-[#963d2e]">+ Create course</Button>
      </Link>
    </div>
  )
}

export default AddCourse
