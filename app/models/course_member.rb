# == Schema Information
#
# Table name: course_members
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  user_id               :bigint      not null, foreign key
#
class CourseMember < ApplicationRecord
  belongs_to :user
  belongs_to :course
end
