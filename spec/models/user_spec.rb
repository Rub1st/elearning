require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    expect(User.new(email: 'dionis.rubis@gmail.com',
                    password: '123456', login: 'Akira',
                    full_name: 'Denis Rubis')).to be_valid
  end

  it 'is not valid without a login' do
    user = User.new(login: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a full_name' do
    user = User.new(full_name: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a email' do
    user = User.new(email: nil)
    expect(user).to_not be_valid
  end

  it 'is not valid without a password' do
    user = User.new(password: nil)
    expect(user).to_not be_valid
  end
end
