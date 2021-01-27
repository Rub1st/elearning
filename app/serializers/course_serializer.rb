# == Schema Information
#
# Table name: courses
#
#  id              :bigint           not null, primary key
#  label           :string           default(""), not null
#  mark            :float
#  why_content     :string           default(""), not null
#  will_content    :string           default(""), not null
#  uses_count      :integer          default(0), not null
#  success_rate    :float            default(0.0), not null
#  access_type     :integer          default("opened"), not null
#  approve_status  :integer          default("pending"), not null
#  organization_id :bigint
#  course_status   :integer          default("draft"), not null
#  author_id       :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class CourseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :label,
             :mark,
             :why_content,
             :will_content,
             :uses_count,
             :success_rate,
             :access_type,
             :approve_status,
             :organization,
             :author,
             :image_url,
             :course_status,
             :created_at

  belongs_to :author
  has_many :course_tags

  def image_url
    url_for(object.image)
  end
end
