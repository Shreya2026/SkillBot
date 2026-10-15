"use client";

import React, { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "../../_context/UserCourseListContext";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  const getUserCourses = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, email));

    setCourseList(result);
    setUserCourseList(result);
  };

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2 className="font-medium text-xl">My AI courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courseList.length > 0 ? (
          courseList.map((course, index) => (
          // if you have an id, prefer key={course.id}
            <CourseCard
              course={course}
              key={course.id ?? index}
              refreshData={getUserCourses}
            />
          ))
        ) : (
          <div className="col-span-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="w-full bg-slate-200 animate-pulse rounded-lg h-[200px]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
