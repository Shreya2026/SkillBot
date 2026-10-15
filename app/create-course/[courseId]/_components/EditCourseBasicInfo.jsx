'use client'
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';



function EditCourseBasicInfo({course, refreshData}) {
    const [name,setName]=useState();
    const [description,setDescription]=useState();

    useEffect(()=>{
        setName(course?.courseOutput?.['Course Name'] || course?.name);
        setDescription(course?.courseOutput?.['Description'] || course?.description);
    },[course]);

    const onUpdateHandler=async()=>{
        course.courseOutput['Course Name']=name;
        course.courseOutput['Description']=description;
        console.log(course);
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList.id, course?.id))
        .returning({id:CourseList.id});
        console.log(result);
        refreshData(true);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger><FaRegEdit /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course Title & Description</DialogTitle>
                        <DialogDescription>
                            Make changes to your course. 
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 mt-4'>
                        <div>
                            <label>Course Title</label>
                            <Input defaultValue={course?.courseOutput?.['Course Name'] || course?.name}
                            onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea defaultValue={course?.courseOutput?.['Description'] || course?.description}
                            onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditCourseBasicInfo
