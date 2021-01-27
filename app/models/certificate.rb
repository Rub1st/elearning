# == Schema Information
#
# Table name: certificates
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
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
