# == Schema Information
#
# Table name: registered_members
#
#  id                    :bigint      not null, primary key
#  user_id               :bigint      not null, foreign key
#  member_role           :integer     not null
#  organization_id       :bigint      not null, foreign key
#  author_id_and_label   :index
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
