class Organization < ApplicationRecord
  enum approve_status: %i[pending rejected approved]

  has_one_attached :certificate_template

  has_many :courses, dependent: :destroy
  has_many :registered_members, dependent: :destroy
  has_many :unregistered_members, dependent: :destroy
end
