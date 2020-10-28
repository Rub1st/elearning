class RegisteredMemberSerializer < ActiveModel::Serializer
  attributes :id, :user, :organization, :member_role
end
