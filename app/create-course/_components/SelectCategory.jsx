"use client"
import React, { useContext } from 'react';
import { UserInputContext } from '../../_context/UserInputContext';
import CategoryList from '@/app/_shared/CategoryList'


function SelectCategory() {
    
    const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
    
    const handleCategoryChange=(category)=> {
        setUserCourseInput(prev=>({
            ...prev,
            category:category
        }))
    }

    return (
    <div className='px-2 md:px-8'>
        <h2 className='display-serif mb-6 text-3xl font-bold'>What are you curious about?</h2>
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
      {CategoryList.map((item,index)=> (
        <div key={index} className={`flex cursor-pointer flex-col items-center border p-6 text-center transition-all hover:-translate-y-1 hover:border-[#1d5b50] hover:bg-[#e8dfcf] ${userCourseInput.category==item.name ? 'border-[#1d5b50] bg-[#dce6dd] shadow-[4px_4px_0_#e4a853]' : 'border-[#d8d0c2] bg-[#fffdf7]'}`}
        onClick={() => handleCategoryChange(item.name)}>
            <img src={item.icon} alt={item.name}  height={50} width={50}className="w-12 h-12" />
            <h3 className="mt-3 text-lg font-bold text-[#1d5b50]">{item.name}</h3>
            <p className="text-sm text-[#68736c]">{item.prompt}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default SelectCategory
