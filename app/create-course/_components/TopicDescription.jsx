"use client"
import React from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContext } from 'react';
import { UserInputContext } from '../../_context/UserInputContext';


function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const handleInputCChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }));
    }
  return (
    <div className='mx-2 md:mx-10'>
        <div className='mt-5'>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]" htmlFor="">Write the topic for which you want to generate a course
                (e.g.., Python, React, AI, etc.)</label>
            <Input placeholder={'Topic'} 
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputCChange('topic', e.target.value)} />
        </div>
        <div className='mt-5'>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]" htmlFor="">
                Tell us more about your course, what you want to include in the course(optional) 
            </label>
            <Textarea placeholder="About your course"
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputCChange('description', e.target.value)} />
        </div>
      
    </div>
  )
}

export default TopicDescription
