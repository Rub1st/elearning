class UnregisteredMember < ApplicationRecord
  belongs_to :organization

  enum member_role: %i[manager common]
end
