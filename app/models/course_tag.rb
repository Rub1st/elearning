# == Schema Information
#
# Table name: course_tags
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  tag_id     :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CourseTag < ApplicationRecord
  belongs_to :course
  belongs_to :tag
end
