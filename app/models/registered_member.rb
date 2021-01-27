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
class RegisteredMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  enum member_role: { manager: 0, common: 1 }

  searchkick

  def search_data
    {
      user_login: user.login,
      user_full_name: user.full_name,
      user_email: user.email
    }
  end
end
