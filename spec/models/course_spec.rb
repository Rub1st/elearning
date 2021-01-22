require 'rails_helper'

RSpec.describe Course, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    expect(Course.new(label: 'Ruby',
                      why_content: '-',
                      will_content: '-',
                      author: user)).to be_valid
  end

  it 'is not valid without a why_content' do
    course = Course.new(why_content: nil)
    expect(course).to_not be_valid
  end

  it 'is not valid without a will_content' do
    course = Course.new(will_content: nil)
    expect(course).to_not be_valid
  end

  it 'is not valid without a label' do
    course = Course.new(label: nil)
    expect(course).to_not be_valid
  end
end
