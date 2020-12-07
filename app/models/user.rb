# == Schema Information
#
# Table name: users
#
#  id                     :bigint      not null, primary key
#  login                  :string      not null
#  email                  :string      not null
#  full_name              :string      not null
#  birthday               :datetime    not null
#  user_role              :integer     not null
#  password               :string      not null
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[google_oauth2]
         #,:confirmable

  def self.create_from_provider_data(provider_data)
    p provider_data
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
      user.full_name = provider_data.info.name
      user.login = provider_data.info.first_name
      user.birthday = Date.new
      user.email = provider_data.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  enum user_role: %i[admin common]
  enum user_status: %i[pending blocked approved]

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
  has_many :course_members, dependent: :destroy

  validates :login, :full_name, presence: true
  validates :email, presence: true
  validates :password, presence: true
end
