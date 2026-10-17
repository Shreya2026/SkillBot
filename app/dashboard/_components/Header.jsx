import React from 'react'
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';


function Header() {
  const { user } = useUser();
  return (
    <div className='flex min-h-[84px] items-center justify-between border-b border-[#d8d0c2] bg-[#fffdf7] px-6 py-4 md:px-10'>
      <div>
        <p className="eyebrow">Personal learning studio</p>
        <p className="display-serif text-2xl font-bold">Good to see you, {user?.firstName || 'learner'}.</p>
      </div>
      <UserButton />
    </div>
  )
}

export default Header
