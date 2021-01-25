# == Schema Information
#
# Table name: unregistered_members
#
#  id                         :bigint      not null, primary key
#  email                      :string      not null
#  code                       :string      not null
#  member_role                :integer     not null
#  organization_id            :bigint      not null, foreign key
#  organization_id_and_email  :index
#
class UnregisteredMember < ApplicationRecord
  belongs_to :organization

  enum member_role: { manager: 0, common: 1 }

  validates :email, :code, presence: true

  after_create :welcome_send

  searchkick word_middle: %i[email]

  def search_data
    {
      email: email
    }
  end

  def welcome_send
    WelcomeMailer.welcome_send(self).deliver
  end
end
