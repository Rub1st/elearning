# == Schema Information
#
# Table name: certificates
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  user_id               :bigint      not null, foreign key
#  course_id_and_user_id :index       not null
#
class Certificate < ApplicationRecord
  belongs_to :course
  belongs_to :user

  has_one_attached :certificate_pdf

  searchkick

  def search_data
    {
      course_label: course.label,
      course_why_content: course.why_content,
      course_will_content: course.will_content
    }
  end
end
