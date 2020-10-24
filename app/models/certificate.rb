class Certificate < ApplicationRecord
  belongs_to :course
  belongs_to :user


  has_one_attached :certificate_pdf
end
