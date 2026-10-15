import { pgTable, serial, json, varchar,text } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),        // ✅ fixed
  name: varchar('name').notNull(),
  category: varchar('category').notNull(),        // ✅ fixed
  level: varchar('level').notNull(),
  includeVideo: varchar('includeVideo').notNull().default('Yes'),
  courseOutput: json('courseOutput').notNull(),
  createdBy: varchar('createdBy').notNull(),
  username: varchar('username'),
  userProfileImage: varchar('userProfileImage'),
  image: varchar('image'),
});


export const Chapters=pgTable('chapters',{
  id:serial('id').primaryKey(),
  courseId:varchar('courseId').notNull(),
  chapterId:varchar('chapterId').notNull(),
  chapterName: text("chapterName").notNull(),
  content:json('content').notNull(),
  videoId:varchar('videoId').notNull()
})