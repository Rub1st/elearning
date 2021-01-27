# == Schema Information
#
# Table name: impersonations
#
#  id              :bigint           not null, primary key
#  start           :datetime         not null
#  end             :datetime         not null
#  organization_id :bigint           not null
#  manager_id      :bigint
#  common_id       :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class ImpersonationSerializer < ActiveModel::Serializer
  attributes :id,
             :start,
             :end

  has_one :manager
  has_one :common
  belongs_to :organization
end
