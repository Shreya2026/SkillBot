"use client";

import { use } from "react";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { Chapters, CourseList } from "@/configs/schema";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { and } from "drizzle-orm";

function CourseStart({ params }) {
  const { courseId } = use(params); 

  const [course, setCourse] = useState(null);
  const [selectedChapter,setSelectedChapter]=useState();
  const [chapterContent,setChapterContent]=useState();

  useEffect(() => {
    if (courseId) {
      GetCourse(courseId);
    }
  }, [courseId]);

  const GetCourse = async (id) => {
    const result = await db.select().from(CourseList).where(eq(CourseList.courseId, id));
    if (result.length > 0) {
      setCourse(result[0]);
    }
  };

  const GetSelectedChapterContent=async(chapterId)=>{
     const result=await db.select().from(Chapters)
     .where(and(eq(Chapters.chapterId,chapterId),
    eq(Chapters.courseId,course.courseId)));
    setChapterContent(result[0]);
    console.log(result);
  }

  return (
    <div className="flex items-start min-h-screen">
      <div className="md:w-64 text-black border-r h-screen flex flex-col">
        <h2 className="font-medium text-lg p-5 bg-gray-200 text-black
        ">
          {course?.courseOutput?.["Course Name"]}
        </h2>

        <div className="overflow-y-auto">
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div className="cursor-pointer hover:bg-gray-200" key={index}
            onClick={()=>{setSelectedChapter(chapter);
              GetSelectedChapterContent(index)
            }}>
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:ml-6 flex-1">
        <ChapterContent chapter={selectedChapter}
        content={chapterContent}
        />
      </div>
    </div>
  );
}

export default CourseStart;
