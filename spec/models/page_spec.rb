require 'rails_helper'

RSpec.describe Page, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    course = Course.create(label: 'Ruby',
                           why_content: '-',
                           will_content: '-',
                           author: user)

    expect(Page.new(course: course,
                    title: 'So Lets Start')).to be_valid
  end

  it 'is not valid without a title' do
    page = Page.new(title: nil)
    expect(page).to_not be_valid
  end
end
