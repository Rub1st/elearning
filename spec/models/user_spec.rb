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
