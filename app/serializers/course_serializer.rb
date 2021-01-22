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
