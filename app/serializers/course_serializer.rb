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
             :certificates,
             :course_status,
             :created_at

  has_many :pages
  belongs_to :author
  has_many :comments
  has_many :course_tags
  has_many :certificates
  has_many :user_courses
  has_many :course_members

  def certificates
    Certificate.with_attached_certificate_pdf.where(course_id: object.id)
  end

  def image_url
    variant = object.image.variant(resize: '100x100')
    rails_representation_url(variant, only_path: true)
  end
end
