#!/bin/bash


# rails g model Organization name:string description:text --force
# rails g model OrganizationMember organization:references user:references member_role:integer --force
# rails g model Course name:string description:text access_type:integer course_status:integer image:string --force
# rails g model Page course:references order:integer content:text --force
# rails g model Question content:text question_type:integer page:references --force
# rails g model Answer question:references content:string --force
# rails g model Comment course:references content:text --force
# rails g model ReplyComment comment:references content:text --force
# rails g model Tag name:string --force
# rails g model CourseTag course:references tag:references --force
# rails g model Certificate course:references user:references --force
# rails g model UserCourse user:references course:references is_favorite:boolean progress:float mark:float course_status:integer --force
# rails g model UserAnswer question:references user_course:references is_correct:boolean answer:string --force