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
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <div className="mb-12 flex flex-col items-center">
        <p className="eyebrow">The course studio</p>
        <h2 className="display-serif mt-3 text-center text-5xl font-bold text-[#1d2924]">Create your next chapter.</h2>
        <p className="mt-3 text-center text-[#68736c]">A few thoughtful choices, then we build the first draft.</p>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {StepperOptions.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center text-center">
              <div className={`grid h-14 w-14 place-items-center border-2 p-4 text-2xl ${activeIndex >= index ? 'border-[#1d5b50] bg-[#1d5b50] text-[#fffdf7]' : 'border-[#c9c0b2] bg-[#fffdf7] text-[#68736c]'}`}>
                {item.icon}
              </div>
              <div className={`mt-2 text-sm font-bold uppercase tracking-wider ${activeIndex >= index ? 'text-[#1d5b50]' : 'text-[#68736c]'}`}>{item.name}</div>
            </div>

            
            {index !== StepperOptions.length - 1 && (
              <div className={`hidden h-px w-[60px] bg-[#c9c0b2] sm:block md:w-[100px] lg:w-[150px]
                ${activeIndex-1>=index && 'bg-[#1d5b50]'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className='paper-panel mx-auto mt-10 max-w-5xl p-5 md:p-10'>
      {activeIndex ==0? <SelectCategory /> : activeIndex==1 ? <TopicDescription /> : <SelectOption />}

      <div className='mx-auto mt-8 flex max-w-5xl justify-between'>
        <Button className="rounded-none border border-[#1d5b50] bg-transparent text-[#1d5b50] hover:bg-[#e8dfcf]" onClick={()=>setActiveIndex(activeIndex - 1)} disabled={activeIndex === 0}>Previous</Button>
        {activeIndex<2 && <Button disabled={checkStatus()} className="rounded-none bg-[#1d5b50] px-6 text-[#fffdf7] hover:bg-[#294a41]" onClick={()=>setActiveIndex(activeIndex + 1)}>Continue <span aria-hidden="true">→</span></Button>}
        {activeIndex==2 &&<Button disabled={checkStatus()} className="rounded-none bg-[#b54e3b] px-6 text-[#fffdf7] hover:bg-[#963d2e]" onClick={() => GenerateCourseLayout()}>Generate course layout</Button>}
      </div>

      <LoadingDialog loading={Loading} />

    </div>
    </div>
  );
}

export default CreateCourse;
