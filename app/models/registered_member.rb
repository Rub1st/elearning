class RegisteredMember < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  enum member_role: %i[manager common]
end
