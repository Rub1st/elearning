class CourseSerializer < ActiveModel::Serializer
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
             :image

  has_many :pages
  has_one :author
end
