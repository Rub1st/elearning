class RegisteredMemberSerializer < ActiveModel::Serializer
  attributes :id,
             :user,
             :organization,
             :member_role

  belongs_to :organization
end
