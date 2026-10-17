import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { useContext } from 'react';
import { UserInputContext } from '../../_context/UserInputContext';


function SelectOption() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
        const handleInputCChange = (fieldName, value) => {
            setUserCourseInput(prev => ({
                ...prev,
                [fieldName]: value
            }));
        }
    return (
        <div className='px-2 md:px-10'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                    <label className='mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]'>Difficulty level</label>
                    <Select onValueChange={(value)=>handleInputCChange('Level',value)}
                        defaultValue={userCourseInput?.Level}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]'>Course Duration</label>
                    <Select 
                    defaultValue={userCourseInput?.Duration}
                    onValueChange={(value)=>handleInputCChange('Duration',value)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hour">1 Hour</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]'>Add video</label>
                    <Select defaultValue={userCourseInput?.['Display video']} 
                    onValueChange={(value)=>handleInputCChange('Display video',value)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='mb-2 block text-sm font-bold uppercase tracking-wider text-[#1d5b50]'>No of Chapters</label>
                    <Input type="number" className="h-14 text-lg"
                    defaultValue={userCourseInput?.noOfChapters}
                    onChange={(e) => handleInputCChange('noOfChapters', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectOption
