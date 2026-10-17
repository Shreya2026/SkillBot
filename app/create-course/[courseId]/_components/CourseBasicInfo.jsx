"use client";
import React from 'react'
import Image from 'next/image';
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import {Button} from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useState } from 'react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseBasicInfo({ course ,refreshData,edit=true}) {
  const [selectedFile,setSelectedFile]=useState();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const onFileSelected=async(event)=>{
    const file=event.target.files?.[0];
    if (!file) return;

    setUploadError('');

    if (!course?.id) {
      setUploadError('Course details are still loading. Please try selecting the image again.');
      event.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      event.target.value = '';
      return;
    }

    setSelectedFile(URL.createObjectURL(file));

    try {
      setUploading(true);
      
      // Upload to Cloudinary using unsigned upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'SkillBot');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(errorDetails || 'Upload failed');
      }
      
      const data = await response.json();
      const imageUrl = data.secure_url;
      if (!imageUrl) {
        throw new Error('The image service did not return an image URL.');
      }
      console.log('Image uploaded to Cloudinary:', imageUrl);
      
      // Update database with image URL
      await db.update(CourseList)
        .set({ image: imageUrl })
        .where(eq(CourseList.id, course.id));
      
      console.log('Database updated with image URL');
      
      // Refresh the course data
      if (refreshData) {
        await refreshData(true);
      }
      
      setUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setSelectedFile(undefined);
      setUploadError(`Failed to upload image: ${error.message || 'Please try again.'}`);
    } finally {
      event.target.value = '';
    }
  }
  return (
    <div className='paper-panel mt-8 p-5 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-10 gap-5'>
        <div className='md:col-span-7'>
          <p className="eyebrow">Course identity</p>
          <h2 className='display-serif mt-2 text-4xl font-bold'>{course?.courseOutput?.['Course Name'] || course?.name}
             {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}</h2>
          <p className='mt-4 max-w-2xl text-[#68736c]'>{course?.courseOutput?.Description || course?.description || "No description available."}</p>
          <h2 className='mt-5 flex items-center gap-2 font-bold uppercase tracking-wider text-[#b54e3b]'><IoExtensionPuzzleOutline />{course?.category || "Uncategorized"}</h2>
          {!edit &&<Link href={'/course/'+course?.courseId+'/start'}>
          <Button className='mt-5 rounded-none bg-[#1d5b50] text-[#fffdf7] hover:bg-[#294a41]'>Start learning</Button>
          </Link>}
        </div>
        <div className='md:col-span-3'>
            <label htmlFor='upload-image' className='cursor-pointer'>
            <Image src={selectedFile ? selectedFile : (course?.image || '/placeholder.png')} alt="Course Image" width={300} height={200} 
            className='rounded-lg w-full h-auto object-cover cursor-pointer' /></label>
            {uploading && <p className='mt-2 text-sm text-[#1d5b50]' role="status">Uploading cover image...</p>}
            {uploadError && <p className='mt-2 text-sm text-[#b54e3b]' role="alert">{uploadError}</p>}
            <input type="file" id="upload-image" className='sr-only' accept="image/*"
            onChange={onFileSelected}/>
        </div>
      </div> 
    </div>
  );
}


export default CourseBasicInfo
