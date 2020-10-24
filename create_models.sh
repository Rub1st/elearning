#!/bin/bash

# rails g model Organization name:string description:string approve_status:integer -force
# rails generate model RegisteredMember member_role:integer organization:references user:references -force
# rails generate model UnregisteredMember member_role:integer organization:references code:string email:string

rails generate model Tag name:string