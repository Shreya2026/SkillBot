"use client"
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { Button } from '@/components/ui/button'

const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };

function ChapterContent({chapter,content,onPreviousChapter,onNextChapter}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Handle different content structures
  const contentArray = Array.isArray(content?.content) 
    ? content.content 
    : Array.isArray(content) 
    ? content 
    : [];

  // Clean code by removing <precode> tags
  const cleanCode = (code) => {
    if (!code) return '';
    return code
      .replace(/<precode>/g, '')
      .replace(/<\/precode>/g, '')
      .trim();
  };

  const copyToClipboard = async (code, index) => {
    try {
      await navigator.clipboard.writeText(cleanCode(code));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='mx-auto max-w-4xl p-6 md:p-12'>
      <p className="eyebrow">Lesson notes</p>
      <h2 className='display-serif mt-3 text-5xl font-bold'>
        {chapter?.['Chapter Name']}
      </h2>
      <p className='mt-4 text-lg leading-8 text-[#68736c]'>{chapter?.['About']}</p>
      <div className='my-8 flex justify-center overflow-hidden border border-[#d8d0c2] bg-[#e8dfcf] p-3'>
        <YouTube videoId={content?.videoId}
      opts={opts}/>
      </div>
      
      <div className="space-y-5">
  {contentArray.length > 0 ? (
    contentArray.map((item, index) => (
      <div key={index} className="border-l-4 border-[#e4a853] bg-[#fffdf7] p-6 shadow-[4px_4px_0_#e8dfcf]">
        <h2 className="display-serif text-2xl font-bold text-[#1d2924]">{item.title}</h2>
        <p className="mb-2 mt-3 whitespace-pre-wrap text-[#68736c]">{item.description}</p>
        
        {item.code && 
        <div className='relative mt-3'>
          <button
            onClick={() => copyToClipboard(item.code, index)}
            className='absolute right-2 top-2 rounded bg-[#1d5b50] p-2 transition-colors hover:bg-[#294a41]'
            title='Copy code'
          >
            {copiedIndex === index ? (
              <FiCheck className='text-green-400' size={16} />
            ) : (
              <FiCopy className='text-white' size={16} />
            )}
          </button>
          <pre className="max-h-96 overflow-x-auto rounded bg-[#1d2924] p-4 text-[#f5f1e8]">
            <code>{cleanCode(item.code)}</code>
          </pre>
        </div>
        }
      </div>
    ))
  ) : (
    <div className="border border-[#d8d0c2] bg-[#fffdf7] p-5">
      <p className="text-[#68736c]">No content available for this chapter.</p>
    </div>
  )}
</div>

      {chapter && (
        <nav className="mt-10 flex flex-col gap-3 border-t border-[#d8d0c2] pt-6 sm:flex-row sm:justify-between" aria-label="Chapter navigation">
          {onPreviousChapter ? (
            <Button type="button" variant="outline" className="h-11 rounded-none border-[#1d5b50] bg-transparent text-[#1d5b50] hover:bg-[#e8dfcf]" onClick={onPreviousChapter}>
              ← Previous Chapter
            </Button>
          ) : <span />}
          {onNextChapter && (
            <Button type="button" className="h-11 rounded-none bg-[#1d5b50] text-[#fffdf7] hover:bg-[#294a41]" onClick={onNextChapter}>
              Next Chapter →
            </Button>
          )}
        </nav>
      )}

    </div>
  )
}

export default ChapterContent
