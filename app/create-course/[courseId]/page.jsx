"use client";
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '@/configs/db';
import CourseBasicInfo from './_components/CourseBasicInfo';
import { and, eq } from 'drizzle-orm';
import { use } from 'react';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
import { GenerateChapterContent_AI, sendMessageWithRetry } from '@/configs/AiModel';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';
import { Chapters } from '@/configs/schema';



function CourseLayout({ params }) {
  const paramValues = params;
  const { courseId } = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
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

  const GenerateChapterContent = async () => {
  setLoading(true);

  const chapters = course.courseOutput.Chapters;

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const PROMPT = `Explain the concept in Detail on Topic: ${course.name}, Chapter: ${chapter['Chapter Name']}. 
    
    Return response as a JSON array. Each object should have:
    - title: section title (string)
    - description: detailed explanation - keep it simple and informative (string)
    - code: OPTIONAL - only include if you can provide a SHORT, simple code example (string, one line max)
    
    CRITICAL: Use valid JSON only. Do NOT include multi-line code examples. Do NOT use unescaped quotes or backslashes.
    
    Example format:
    [
      {"title": "What is JWT", "description": "JWT stands for JSON Web Token used for authentication"},
      {"title": "Basic Setup", "description": "Install required packages", "code": "npm install jsonwebtoken"}
    ]
    
    Return ONLY the JSON array.`;

    console.log("Sending prompt to Gemini:", PROMPT);

    try {
      // Wait for videoId
      const response = await service.getVideos(course.name, chapter['Chapter Name']);
      const videoId = response[0]?.id?.videoId || '';

      // Generate chapter content
      const result = await sendMessageWithRetry(GenerateChapterContent_AI, PROMPT);
      const rawText = await result.response?.text();

      console.log("Raw response text:", rawText); // ✅ log raw text

      // Clean the response text - remove markdown code blocks and extra formatting
      let cleanedText = rawText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      let content;
      try {
        content = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("JSON parse error, attempting advanced fix:", parseError);
        console.log("Problematic JSON snippet:", cleanedText.substring(0, 500));
        
        // Advanced JSON repair
        try {
          // Parse as relaxed JSON - extract array if wrapped in other text
          const arrayMatch = cleanedText.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (arrayMatch) {
            cleanedText = arrayMatch[0];
          }
          
          // Fix common issues with a safer approach
          cleanedText = cleanedText
            // Fix unescaped quotes in strings (basic heuristic)
            .replace(/([^\\])"([^"]*)":/g, '$1\\"$2":')
            // Remove control characters except \n and \t
            .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '')
            // Ensure consistent line endings
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n');
          
          content = JSON.parse(cleanedText);
        } catch (secondError) {
          console.error("Advanced fix failed. Saving raw text as single content block.");
          // Fallback: create a simple structure
          content = [{
            title: chapter['Chapter Name'],
            description: "AI response could not be parsed. Raw content: " + rawText.substring(0, 1000),
            error: true
          }];
        }
      }
      
      console.log("Parsed JSON content:", content); // ✅ log parsed content

      // Save to DB
      await db.insert(Chapters).values({
        courseId: course.courseId,
        chapterId: index,
        chapterName: chapter['Chapter Name'],
        content: content,
        videoId: videoId,
      });

    } catch (error) {
      console.error(`Error generating content for chapter ${index + 1}:`, error);
      alert(`Failed to generate content for chapter: ${chapter['Chapter Name']}. ${error.message || 'Please try again later.'}`);
      // Continue with next chapter even if one fails
    }
  }

  setLoading(false);
  router.replace('/create-course/' + course.courseId + '/finish');
};


  return (
    <div className="mt-10 px-7 md:px-20 lg:x-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {course && <CourseBasicInfo course={course} refreshData={() => GetCourse()} />}

      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-10" onClick={GenerateChapterContent}>Generate Course Content</Button>
    </div>
  );
}

export default CourseLayout
