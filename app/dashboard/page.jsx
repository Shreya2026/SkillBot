// app/dashboard/page.tsx
"use client"
import React from "react";
import AddCourse  from './_components/AddCourse';
import UserCourseList from './_components/UserCourseList';


export default function Dashboard() {
  return (
    <div className="p-6">
      <AddCourse />
      <UserCourseList />
    </div>
  );
}
