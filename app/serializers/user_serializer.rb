class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :full_name,
             :login,
             :email,
             :birthday,
             :user_role,
             :avatar

  has_many :courses
  has_many :comments
  has_many :certificates
  has_many :user_courses
end
