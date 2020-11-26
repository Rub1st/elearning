class ImpersonationSerializer < ActiveModel::Serializer
  attributes :id,
             :start,
             :end

  has_one :manager
  has_one :common
  belongs_to :organization
end
