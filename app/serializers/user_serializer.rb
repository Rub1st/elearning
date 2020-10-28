class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :login, :email, :birthday, :user_role, :avatar
end
