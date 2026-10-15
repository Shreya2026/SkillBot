import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';


function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm bg-gradient-to-r from-purple-600 to-purple-500'>
      <Image src={'/logo.png'} alt="Logo" width={70} height={70} />
      <UserButton />
    </div>
  )
}

export default Header
