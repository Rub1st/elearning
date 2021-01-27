# == Schema Information
#
# Table name: course_members
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  course_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CourseMember < ApplicationRecord
  belongs_to :user
  belongs_to :course
end
