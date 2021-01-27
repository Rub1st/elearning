# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  login                  :string           default(""), not null
#  email                  :string           default(""), not null
#  full_name              :string           default(""), not null
#  user_role              :integer          default("common"), not null
#  encrypted_password     :string           default(""), not null
#  user_status            :integer          default("approved"), not null
#  provider               :string(50)       default(""), not null
#  uid                    :string(500)      default(""), not null
#  language               :string           default("en")
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
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
