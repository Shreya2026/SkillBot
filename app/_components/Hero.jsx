import React from 'react'
import Image from 'next/image'

function Hero() {
    return (
        <section className="relative overflow-hidden px-6 py-20 md:px-12 lg:min-h-[calc(100vh-84px)] lg:py-28">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="grid items-center gap-14 text-left lg:grid-cols-[1.05fr_.95fr]">
                    <div>
                    <p className="eyebrow mb-6">A studio for curious minds</p>
                    <h1 className="display-serif max-w-3xl text-6xl font-bold leading-[.95] text-[#1d2924] sm:text-8xl">
                        Make room for <em className="text-[#b54e3b]">better</em> learning.

                    </h1>
                    <p className="mt-8 max-w-xl text-lg leading-8 text-[#68736c] sm:text-xl">
                        Skill Bot turns a spark of curiosity into a considered course — structured, personal, and ready when you are.
                    </p>
                    <div className="mt-10 flex gap-4 sm:mt-12">
                        <a
                            className="inline-block bg-[#1d5b50] px-7 py-4 font-bold text-[#fffdf7] transition-colors hover:bg-[#294a41]"
                            href="/dashboard"
                        >
                            Begin a course
                        </a>
                    </div>
                    <div className="relative mx-auto w-full max-w-md">
                        <div className="paper-panel rotate-3 p-4">
                            <div className="aspect-[4/5] overflow-hidden bg-[#dce6dd]">
                                <Image src="/creative.jpg" alt="Creative learning" width={600} height={750} className="h-full w-full object-cover mix-blend-multiply" />
                            </div>
                            <div className="flex items-end justify-between px-2 pb-2 pt-5">
                                <div><p className="eyebrow">Field notes / 01</p><p className="display-serif mt-1 text-2xl">Learn in layers.</p></div>
                                <span className="text-3xl text-[#e4a853]">✦</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
