# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  login                  :string           default(""), not null
#  email                  :string           default(""), not null
#  full_name              :string           default(""), not null
#  user_role              :integer          default("common"), not null
#  encrypted_password     :string           default(""), not null
#  user_status            :integer          default("approved"), not null
#  provider               :string(50)       default(""), not null
#  uid                    :string(500)      default(""), not null
#  language               :string           default("en")
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class User < ApplicationRecord
  has_many :certificates, dependent: :destroy
  has_many :registered_members, dependent: :destroy
  has_many :courses, foreign_key: :author_id, inverse_of: 'author', dependent: :destroy
  has_many :comments, foreign_key: :author_id, inverse_of: 'author', dependent: :destroy
  has_many :replies, foreign_key: :author_id, inverse_of: 'author', dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :user_answers, dependent: :destroy
  has_many :manager_impersonations,
           class_name: 'Impersonation',
           foreign_key: :manager_id,
           inverse_of: 'manager',
           dependent: :destroy
  has_many :common_impersonations,
           class_name: 'Impersonation',
           foreign_key: :common_id,
           inverse_of: 'common',
           dependent: :destroy
  has_many :course_members, dependent: :destroy

  has_one_attached :avatar
  has_one_attached :certificate_template

  enum user_role: { admin: 0, common: 1 }
  enum user_status: { approved: 0, blocked: 1 }

  validates :login, :full_name, presence: true
  validates :email, presence: true

  after_commit :reindex_courses, :reindex_comments, :reindex_impersonations

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :omniauthable, omniauth_providers: %i[google_oauth2]

  searchkick word_middle: %i[login email full_name]

  # rubocop:disable Metrics/AbcSize
  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
      user.full_name = provider_data.info.name
      user.login = provider_data.info.first_name
      user.email = provider_data.info.email
      user.password = Devise.friendly_token[0, 20]
      user.confirmed_at = Time.now.utc
    end
  end
  # rubocop:enable Metrics/AbcSize

  def reindex_courses
    courses.reindex
  end

  def reindex_comments
    comments.reindex
  end

  def reindex_impersonations
    manager_impersonations.reindex
    common_impersonations.reindex
  end

  def search_data
    {
      login: login,
      email: email,
      full_name: full_name
    }
  end
end
