require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    course = Course.create(label: 'Ruby',
                           why_content: '-',
                           will_content: '-',
                           author: user)

    expect(Comment.new(author: user,
                       course: course,
                       content: 'it is really good course!')).to be_valid
  end

  it 'is not valid without a content' do
    comment = Comment.new(content: nil)
    expect(comment).to_not be_valid
  end
end
