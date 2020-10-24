class Course < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :author, class_name: 'User'
  belongs_to :report
  has_many :certificates, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :course_tags, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :user_courses, dependent: :destroy

  enum approve_status: %i[pending rejected approved]
  enum access_type: %i[public private individual]

  has_one_attached :image
end
