"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-500 shadow">
      <Image src={'/logo.png'} alt="Logo" width={100} height={50} />
      <SignedOut>
        <SignInButton>
          <Button variant="default">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

    </div>
  )
}

export default Header;

