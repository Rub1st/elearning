class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :full_name,
             :login,
             :email,
             :user_role,
             :avatar_url,
             :certificate_template_url,
             :encrypted_password,
             :created_at,
             :user_status

  def avatar_url
    url_for(object.avatar) if object.avatar.attached?
  end

  def certificate_template_url
    url_for(object.certificate_template) if object.certificate_template.attached?
  end
end
