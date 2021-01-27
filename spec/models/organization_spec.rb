# == Schema Information
#
# Table name: organizations
#
#  id             :bigint           not null, primary key
#  name           :string           default(""), not null
#  description    :string           default(""), not null
#  approve_status :integer          default("pending"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
require 'rails_helper'

RSpec.describe Organization, type: :model do
  it 'is valid with valid attributes' do
    expect(described_class.new(name: 'Ruby&Rails',
                               description: '-')).to be_valid
  end

  it 'is not valid without a name' do
    organization = described_class.new(name: nil)
    expect(organization).to_not be_valid
  end

  it 'is not valid without a description' do
    organization = described_class.new(description: nil)
    expect(organization).to_not be_valid
  end
end
