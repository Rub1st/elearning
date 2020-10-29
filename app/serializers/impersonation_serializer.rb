class ImpersonationSerializer < ActiveModel::Serializer
  attributes :id,
             :start,
             :end,
             :manager,
             :common

  has_one :manager
  has_one :common
end
