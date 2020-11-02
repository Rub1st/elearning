# == Schema Information
#
# Table name: organizations
#
#  id                    :bigint      not null, primary key
#  name                  :string      not null
#  description           :string      not null
#  approve_status        :integer     not null
#
class Organization < ApplicationRecord
  enum approve_status: %i[pending rejected approved]

  has_one_attached :certificate_template

  has_many :courses, dependent: :destroy
  has_many :registered_members, dependent: :destroy
  has_many :unregistered_members, dependent: :destroy

  validates :name, :description, presence: true
end
