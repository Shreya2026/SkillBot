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
    <div className='flex items-center justify-between'>
      <div >
        <h2 className='text-lg'>Hello, <span className='font-bold'>{user?.fullName}</span></h2>
        <p className='text-sm text-gray-500'>create new course with AI, learn from the best and share it with your friends.</p>
      </div>

      <Link href={userCourseList.length >= 5 ?'/dashboard/upgrade': '/create-course'  }>
        <Button> + Create Course</Button>
      </Link>
    </div>
  )
}

export default AddCourse
