"use client"
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db'
import CourseCard from '../_components/CourseCard';

function explore() {
  const [courseList,setCourseList]=useState();
  useEffect(()=>{
    GetAllCourses();
  },[])
  const GetAllCourses=async()=>{
    const result= await db.select().from(CourseList).limit(9)
    .offset(0);
    setCourseList(result);
    console.log(result);
  }
  return (
    <div>
      <h2 className='font-bold text-2xl'>Explore More Projects</h2>
      <p>Explore more projects build with AI by other users</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.map((course,index)=>(
          <div key={index}>
            <CourseCard course={course}/>
          </div>        ))}
      </div>
    </div>
  )
}

export default explore
