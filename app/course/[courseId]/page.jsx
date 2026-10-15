"use client"
import React from 'react'
import { useEffect } from 'react';
import { use } from 'react'; // ✅ This is the key change
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import Header from '@/app/dashboard/_components/Header';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';

function Course({ params }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState(); // ✅ unwrap the Promise

  useEffect(() => {
    resolvedParams && GetCourse();
  }, [resolvedParams]);

  const GetCourse = async () => {
    const result = await db.select()
      .from(CourseList)
      .where(eq(CourseList.courseId, resolvedParams.courseId));

      setCourse(result[0]); // ✅ set the course state with the first result
    
    console.log(result);
  };

  return (
    <div>
      <Header />
      <div className='px-10 p-10 md:px-20 lg:px-44'>
        <CourseBasicInfo course={course} edit={false}/>
        <CourseDetail course={course}/>
        <ChapterList course={course} edit={false}/>
      </div>
      
    </div>
  );
}

export default Course;
