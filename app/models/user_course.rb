# == Schema Information
#
# Table name: user_courses
#
#  id                     :bigint      not null, primary key
#  course_id              :bigint      not null, foreign key
#  user_id                :bigint      not null, foreign key
#  current_page           :integer     not null
#  is_favorite            :boolean     not null
#  progress               :float       not null
#  correct                :float       not null
#  mark                   :float
#  user_id_and_course_id  :index
#
class UserCourse < ApplicationRecord
  belongs_to :user
  belongs_to :course
end
