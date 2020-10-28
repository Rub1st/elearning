class ImpersonationSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :manager, :common
end
