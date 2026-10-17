"use client"
import React from 'react'
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
    <div className='fixed h-full md:w-64 border-r border-[#3c5a51] bg-[#1d2924] p-6 text-[#f5f1e8]'>
      <div className="mb-10 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center bg-[#e4a853] text-xl font-bold text-[#1d2924]">S</span>
        <span className="display-serif text-2xl font-bold">skill bot<span className="text-[#e4a853]">.</span></span>
      </div>
      <p className="mb-4 text-xs uppercase tracking-[.2em] text-[#9eb1a7]">Navigate</p>
      <ul>
        {Menu.map((item,index)=> (
            <Link key={index} href={item.path}>
              <div className={`mb-2 flex cursor-pointer items-center gap-3 border-l-2 p-3 transition-all duration-200 ${path===item.path ? 'border-[#e4a853] bg-[#294a41] text-[#fffdf7]' : 'border-transparent text-[#b7c7be] hover:bg-[#294a41] hover:text-[#fffdf7]'}`}>
                  <div className='text-2xl'>{item.icon}</div>
                  <h2 className='font-medium'>{item.name}</h2>
              </div>
            </Link>
        ))}
      </ul>

      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList.length / 5) * 100} className='h-1 bg-[#3c5a51]' />
        <h2 className='my-2 text-sm font-medium text-[#f5f1e8]'>{userCourseList.length} out of 5 courses created</h2>
        <h2 className='text-xs text-[#9eb1a7]'>Upgrade your plan for unlimited course creation</h2>
      </div>
    </div>
  )
}

export default SideBar
