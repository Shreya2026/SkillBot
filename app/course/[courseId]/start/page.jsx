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
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);

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

  const SelectChapter = async (index) => {
    const chapter = course?.courseOutput?.Chapters?.[index];
    if (!chapter) return;

    setSelectedChapterIndex(index);
    setSelectedChapter(chapter);
    await GetSelectedChapterContent(index);
  };

  return (
    <div className="flex min-h-screen items-start bg-[#f5f1e8]">
      <div className="min-h-screen border-r border-[#3c5a51] bg-[#1d2924] text-[#f5f1e8] md:w-72">
        <p className="px-6 pt-7 text-xs uppercase tracking-[.2em] text-[#e4a853]">Now studying</p>
        <h2 className="display-serif p-6 text-2xl font-bold text-[#fffdf7]
        ">
          {course?.courseOutput?.["Course Name"]}
        </h2>

        <div className="overflow-y-auto">
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div className="cursor-pointer border-t border-[#3c5a51] transition-colors hover:bg-[#294a41]" key={index}
            onClick={()=>SelectChapter(index)}>
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ChapterContent chapter={selectedChapter}
        content={chapterContent}
        onPreviousChapter={selectedChapterIndex > 0 ? () => SelectChapter(selectedChapterIndex - 1) : undefined}
        onNextChapter={course?.courseOutput?.Chapters && selectedChapterIndex < course.courseOutput.Chapters.length - 1 ? () => SelectChapter(selectedChapterIndex + 1) : undefined}
        />
      </div>
    </div>
  );
}

export default CourseStart;
