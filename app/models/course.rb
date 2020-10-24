class Course < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :author, class_name: 'User'

  enum approve_status: %i[pending rejected approved]
  enum access_type: %i[public private individual]

  has_one_attached :image
end
