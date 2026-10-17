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
    <header className="flex min-h-[84px] items-center justify-between border-b border-[#d8d0c2] bg-[#f5f1e8]/95 px-6 py-4 md:px-12">
      <a href="/" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center bg-[#1d5b50] text-xl font-bold text-[#f5f1e8]">S</span>
        <span className="display-serif text-2xl font-bold tracking-tight text-[#1d2924]">skill bot<span className="text-[#b54e3b]">.</span></span>
      </a>
      <SignedOut>
        <SignInButton>
          <Button className="h-11 rounded-none bg-[#1d5b50] px-6 text-[#fffdf7] hover:bg-[#294a41]">Enter studio</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default Header;
