class UnregisteredMemberSerializer < ActiveModel::Serializer
  attributes :id, :organization, :member_role, :email, :code
end
