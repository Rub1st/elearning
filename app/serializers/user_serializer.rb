class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :full_name,
             :login,
             :email,
             :user_role,
             :avatar_url,
            # :courses,
             :certificate_template_url,
            # :certificates,
             :encrypted_password,
             :decrypted_password,
             :created_at,
             :user_status

  # has_many :courses
  # has_many :comments
  # has_many :replies
  # has_many :certificates
  # has_many :user_courses
  # has_many :user_answers
  # has_many :course_members

  # def certificates
  #   Certificate.with_attached_certificate_pdf.where(user_id: object.id)
  # end

  # def courses
  #   Course.with_attached_image.where(author_id: object.id)
  # end

  # !
  # def avatar_url
  #   variant = object.avatar.variant(resize: '100x100')
  #   rails_representation_url(variant, only_path: true)
  # end

  # !
  # def certificate_template_url
  #   variant = object.certificate_template.variant(resize: '200x300')
  #   rails_representation_url(variant, only_path: true)
  # end

  def avatar_url
    url_for(object.avatar)
  end

  def certificate_template_url
    url_for(object.certificate_template)
  end
end
