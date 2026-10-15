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
    <div className='mx-20 lg:mx-44'>
        <div className='mt-5'>
            <label htmlFor="">write the topic for which you want to generate a course
                (e.g.., Python, React, AI, etc.)</label>
            <Input placeholder={'Topic'} 
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputCChange('topic', e.target.value)} />
        </div>
        <div className='mt-5'>
            <label htmlFor="">
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
