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
class UnregisteredMember < ApplicationRecord
  belongs_to :organization

  enum member_role: { manager: 0, common: 1 }

  validates :email, :code, presence: true

  searchkick word_middle: %i[email]

  def search_data
    {
      email: email
    }
  end
end
