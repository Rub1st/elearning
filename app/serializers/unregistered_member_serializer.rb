# == Schema Information
#
# Table name: unregistered_members
#
#  id              :bigint           not null, primary key
#  member_role     :integer          default("common"), not null
#  organization_id :bigint           not null
#  code            :string           default(""), not null
#  email           :string           default(""), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class UnregisteredMemberSerializer < ActiveModel::Serializer
  attributes :id,
             :organization,
             :member_role,
             :email,
             :code

  belongs_to :organization
end
