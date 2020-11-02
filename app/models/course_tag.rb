# == Schema Information
#
# Table name: course_tags
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  tag_id                :bigint      not null, foreign key
#  course_id_and_tag_id  :index
#
class CourseTag < ApplicationRecord
  belongs_to :course
  belongs_to :tag
end
