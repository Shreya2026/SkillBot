"use client"
import React, { useEffect } from 'react';
import { SiStackshare } from "react-icons/si";
import { MdOutlineTopic } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { useContext } from 'react';
import { GenerateCourseLayout_AI, sendMessageWithRetry } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import uuid4  from 'uuid4';
import { db } from '@/configs/db';
import { useRouter } from 'next/navigation';




function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <SiStackshare />
    },
    {
      id: 2,
      name: 'Topic & Description',
      icon: <MdOutlineTopic />
    },
    {
      id: 3,
      name: 'Options',
      icon: <CgOptions />
    }
  ];

  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
  
  const [activeIndex, setActiveIndex] = useState(0);

  const [Loading,setLoading] = useState(false);

  const {user}=useUser();
  const router=useRouter();

  const GenerateCourseLayout = async() => {
    setLoading(true);
    try {
      const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail with fields: Course Name, Description, Chapter Name, About, Duration.';
      const USER_INPUT_PROMPT =
        `Category: ${userCourseInput?.category}, ` +
        `Topic: ${userCourseInput?.topic}, ` +
        `Level: ${userCourseInput?.Level}, ` +
        `Duration: ${userCourseInput?.Duration}, ` +
        `NoOfChapters: ${userCourseInput?.noOfChapters}, `;

      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      console.log(FINAL_PROMPT);
      
      const result = await sendMessageWithRetry(GenerateCourseLayout_AI, FINAL_PROMPT);
      console.log(result.response?.text());
      console.log(JSON.parse(result.response?.text() || '{}'));
      SaveCourseLayoutIndb(JSON.parse(result.response?.text()));
    } catch (error) {
      console.error("Error generating course layout:", error);
      alert(error.message || "Failed to generate course. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const SaveCourseLayoutIndb= async(courseLayout)=> {
    var id=uuid4();
    setLoading(true);
    const result=await db.insert(CourseList).values({
       courseId: id,
       name: userCourseInput?.topic,
       level:userCourseInput?.Level,
       category: userCourseInput?.category,
       courseOutput: courseLayout,
       createdBy:user?.primaryEmailAddress?.emailAddress,
       username: user?.fullName,
       userProfileImage:user?.imageUrl
    })
    console.log("finish");
    setLoading(false);
    router.replace('/create-course/'+id)
  }
  
  useEffect(() => {
    console.log(userCourseInput);
  },[userCourseInput]);

  const checkStatus = () => {
    if(userCourseInput?.length==0) {
      return true;
    }
    if(activeIndex==0 && (userCourseInput?.category?.length==0 || userCourseInput?.category==undefined)) {
      return true;
    }
    if(activeIndex==1 && (userCourseInput?.topic?.length==0 || userCourseInput?.topic==undefined)) {
    return true;
  }
    else if(activeIndex==2 && (userCourseInput?.Level?.length==0 || userCourseInput?.Duration?.length==0 || userCourseInput?.['Display video']?.length==0)) {
      return true; }
  return false;
}

  return (
    <div className="px-4">
      <div className="flex flex-col items-center mb-8 mt-5">
        <h2 className="text-4xl font-medium text-primary">Create Course</h2>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {StepperOptions.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center text-center">
              <div className={`bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center text-black text-2xl ${activeIndex >= index && 'bg-indigo-500 text-white'}`}>
                {item.icon}
              </div>
              <div className="mt-2 text-sm md:text-base font-medium">{item.name}</div>
            </div>

            
            {index !== StepperOptions.length - 1 && (
              <div className={`hidden sm:block h-1 bg-gray-300 w-[60px] md:w-[100px] lg:w-[150px]
                ${activeIndex-1>=index && 'bg-indigo-500'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'></div>
      {activeIndex ==0? <SelectCategory /> : activeIndex==1 ? <TopicDescription /> : <SelectOption />}

      <div className='flex justify-between mt-10'>
        <Button variant="default" onClick={()=>setActiveIndex(activeIndex - 1)} disabled={activeIndex === 0}>Prev</Button>
        {activeIndex<2 && <Button disabled={checkStatus()} variant="default" onClick={()=>setActiveIndex(activeIndex + 1)}>Next</Button>}
        {activeIndex==2 &&<Button disabled={checkStatus()} variant="default" onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>}
      </div>

      <LoadingDialog loading={Loading} />

    </div>
  );
}

export default CreateCourse;
