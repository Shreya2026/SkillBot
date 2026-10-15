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

  const onFileSelected=async(event)=>{
    const file=event.target.files[0];
    if (!file) return;

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
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      const imageUrl = data.secure_url;
      console.log('Image uploaded to Cloudinary:', imageUrl);
      
      // Update database with image URL
      await db.update(CourseList)
        .set({ image: imageUrl })
        .where(eq(CourseList.id, course.id));
      
      console.log('Database updated with image URL');
      
      // Refresh the course data
      if (refreshData) {
        refreshData(true);
      }
      
      setUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      alert('Failed to upload image: ' + error.message);
    }
  }
  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-10 gap-5'>
        <div className='md:col-span-7'>
          <h2 className='font-bold text-2xl'>{course?.courseOutput?.['Course Name'] || course?.name}
             {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}</h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description || course?.description || "No description available."}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center'><IoExtensionPuzzleOutline />{course?.category || "Uncategorized"}</h2>
          {!edit &&<Link href={'/course/'+course?.courseId+'/start'}>
          <Button className='mt-5'>Start</Button>
          </Link>}
        </div>
        <div className='md:col-span-3'>
            <label htmlFor='upload-image' className='cursor-pointer'>
            <Image src={selectedFile ? selectedFile : (course?.image || '/placeholder.png')} alt="Course Image" width={300} height={200} 
            className='rounded-lg w-full h-auto object-cover cursor-pointer' /></label>
            {uploading && <p className='text-sm text-gray-500 mt-2'>Uploading...</p>}
            <input type="file" id="upload-image" className='opacity-0' accept="image/*"
            onChange={onFileSelected}/>
        </div>
      </div> 
    </div>
  );
}


export default CourseBasicInfo
