"use client"
import React from 'react'
import Image from 'next/image'
import { GrHomeRounded } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { RiStackLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { useContext } from 'react';
import { UserCourseListContext } from '../../_context/UserCourseListContext';


function SideBar() {
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
    const Menu=[
        {
            id:1,
            name: 'Home',
            icon:<GrHomeRounded />,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'Explore',
            icon: <RiStackLine />,
            path: '/dashboard/explore'
        },
        {
            id:3,
            name: 'Settings',
            icon: <CiSettings />,
            path: '/dashboard/settings'
        }
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-lg bg-gradient-to-br from-purple-50 via-white to-purple-50 border-r border-purple-100'>
      <Image src={'/logo.png'} alt="Logo" width={150} height={50} className='mb-5' />
      <hr className='my-5 border-purple-200' />
      <ul>
        {Menu.map((item,index)=> (
            <Link key={index} href={item.path}>
              <div className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all duration-200 cursor-pointer ${path===item.path ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md' : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm'}`}>
                  <div className='text-2xl'>{item.icon}</div>
                  <h2 className='font-medium'>{item.name}</h2>
              </div>
            </Link>
        ))}
      </ul>

      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList.length / 5) * 100} className='h-2' />
        <h2 className='text-sm my-2 font-medium text-gray-700'>{userCourseList.length} out of 5 courses created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course creation</h2>
      </div>
    </div>
  )
}

export default SideBar
