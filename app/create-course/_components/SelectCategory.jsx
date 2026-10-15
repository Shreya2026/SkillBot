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
    <div className='px-10 md:px-20'>
        <h2 className='my-5'>Select the Course Category</h2>
    <div className={`grid grid-cols-3 gap-10 px-10 md:px-20`}>
      {CategoryList.map((item,index)=> (
        <div key={index} className={`flex flex-col p-5 border items-center rounded-lg hover:border-indigo-100 
            hover:bg-indigo-50 cursor-pointer ${userCourseInput.category==item.name && 'border-indigo-500 bg-indigo-100'}`}
        onClick={() => handleCategoryChange(item.name)}>
            <img src={item.icon} alt={item.name}  height={50} width={50}className="w-12 h-12" />
            <h3 className="text-lg font-medium text-indigo-600">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.prompt}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default SelectCategory
