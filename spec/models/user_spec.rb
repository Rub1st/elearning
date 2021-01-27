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
require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    expect(described_class.new(email: 'dionis.rubis@gmail.com',
                               password: '123456', login: 'Akira',
                               full_name: 'Denis Rubis')).to be_valid
  end

  it 'is not valid without a login' do
    user = described_class.new(login: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a full_name' do
    user = described_class.new(full_name: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a email' do
    user = described_class.new(email: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a password' do
    user = described_class.new(password: nil)
    expect(user).to_not be_valid
  end
end
