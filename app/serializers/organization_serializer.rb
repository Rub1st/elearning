class OrganizationSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :approve_status

  has_many :registered_members
  has_many :unregistered_members
end
