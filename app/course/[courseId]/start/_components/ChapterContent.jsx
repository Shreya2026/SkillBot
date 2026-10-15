"use client"
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import { FiCopy, FiCheck } from 'react-icons/fi'

const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };

function ChapterContent({chapter,content}) {
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
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>
        {chapter?.['Chapter Name']}
      </h2>
      <p className='text-gray-500 text-medium'>{chapter?.['About']}</p>
      <div className='flex justify-center my-6'>
        <YouTube videoId={content?.videoId}
      opts={opts}/>
      </div>
      
      <div>
  {contentArray.length > 0 ? (
    contentArray.map((item, index) => (
      <div key={index} className="mb-4 p-5 bg-slate-50 rounded-lg">
        <h2 className="font-medium text-lg text-black">{item.title}</h2>
        <p className="text-gray-400 text-sm mb-2 whitespace-pre-wrap">{item.description}</p>
        
        {item.code && 
        <div className='relative mt-3'>
          <button
            onClick={() => copyToClipboard(item.code, index)}
            className='absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors'
            title='Copy code'
          >
            {copiedIndex === index ? (
              <FiCheck className='text-green-400' size={16} />
            ) : (
              <FiCopy className='text-white' size={16} />
            )}
          </button>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto max-h-96 overflow-y-auto">
            <code>{cleanCode(item.code)}</code>
          </pre>
        </div>
        }
      </div>
    ))
  ) : (
    <div className="mb-4 p-5 bg-slate-50 rounded-lg">
      <p className="text-gray-400">No content available for this chapter.</p>
    </div>
  )}
</div>

    </div>
  )
}

export default ChapterContent
