class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum user_role: %i[admin common]

  has_one_attached :avatar
  has_one_attached :certificate_template

  has_many :certificates, dependent: :destroy
  has_many :registered_members, dependent: :destroy
  has_many :courses, class_name: 'Course', foreign_key: :author_id, dependent: :destroy
  has_many :comments, class_name: 'Comment', foreign_key: :author_id, dependent: :destroy
  has_many :replies, class_name: 'Reply', foreign_key: :author_id, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :user_answers, dependent: :destroy
  has_many :manager_impersonations, class_name: 'Impersonation', foreign_key: :manager_id, dependent: :destroy
  has_many :common_impersonations, class_name: 'Impersonation', foreign_key: :common_id, dependent: :destroy
end
