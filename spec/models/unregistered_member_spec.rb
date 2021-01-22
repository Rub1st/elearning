require 'rails_helper'

RSpec.describe UnregisteredMember, type: :model do
  organization = Organization.create(name: 'Ruby&Rails',
                                     description: '-')
  it 'is valid with valid attributes' do
    expect(UnregisteredMember.new(email: 'boris.ezhov@mail.com',
                                  code: '34655234',
                                  organization: organization)).to be_valid
  end

  it 'is not valid without a email' do
    unregistered_member = UnregisteredMember.new(email: nil)
    expect(unregistered_member).to_not be_valid
  end

  it 'is not valid without a code' do
    unregistered_member = UnregisteredMember.new(code: nil)
    expect(unregistered_member).to_not be_valid
  end
end
