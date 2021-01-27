# == Schema Information
#
# Table name: registered_members
#
#  id              :bigint           not null, primary key
#  member_role     :integer          default("common"), not null
#  organization_id :bigint           not null
#  user_id         :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class RegisteredMemberSerializer < ActiveModel::Serializer
  attributes :id,
             :user,
             :organization,
             :member_role

  belongs_to :organization
end
