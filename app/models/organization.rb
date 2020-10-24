class Organization < ApplicationRecord
  enum approve_status: %i[pending rejected approved]

  has_one_attached :certificate_template
end
