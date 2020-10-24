#!/bin/bash

# rails g model Organization name:string description:string approve_status:integer -force
# rails generate model RegisteredMember member_role:integer organization:references user:references -force
# rails generate model UnregisteredMember member_role:integer organization:references code:string email:string
# rails generate model Tag name:string
# rails generate model Impersonation start:datetime end:datetime
# rails generate model Course label:string mark:float why_content:string will_content:string uses_count:integer success_rate:float access_type:integer approve_status:integer organization:references --force
# rails generate model Page course:references order:integer title:string --force
# rails generate model Question page:references question_type:integer title:string description:string question_text:string difficult:integer --force
# rails generate model Variant order:integer question:references value:string --force
# rails generate model Answer question:references value:string order:integer --force
# rails generate model Comment course:references content:string --force
# rails generate model Reply comment:references content:string --force
rails generate model CourseTag course:references tag:references --force