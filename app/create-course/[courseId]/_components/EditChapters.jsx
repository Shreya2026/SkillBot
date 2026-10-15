'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { useEffect } from 'react';


function EditChapters({ course, index ,refreshData}) {
    const CourseOutput = course.courseOutput.Chapters;
    const [name, setName] = useState();
    const [about, setAbout] = useState();
    useEffect(()=> {
        setName(CourseOutput[index]['Chapter Name'] || course?.name);
        setAbout(CourseOutput[index]['About'] || course?.description);
    },[course,index])
    const onUpdateHandler = async () => {
        CourseOutput[index]['Chapter Name'] = name;
        CourseOutput[index]['About'] = about;
        console.log(CourseOutput);
        const result = await db.update(CourseList).set({
            courseOutput: {
                ...course.courseOutput,
                Chapters: CourseOutput
            }
        }).where(eq(CourseList.id, course?.id))
        refreshData(true);
    }
    return (
        <Dialog>
            <DialogTrigger><FaRegEdit /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        Make changes to your chapter.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 mt-4'>
                    <div>
                        <label>Course Title</label>
                        <Input defaultValue={CourseOutput[index]['Chapter Name'] || course?.name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Description</label>
                        <Textarea defaultValue={CourseOutput[index]['About'] || course?.description}
                            onChange={(e) => setAbout(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                <Button onClick={onUpdateHandler}>Update</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditChapters
