# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  content    :string           default(""), not null
#  author_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
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

    expect(described_class.new(author: user,
                               course: course,
                               content: 'it is really good course!')).to be_valid
  end

  it 'is not valid without a content' do
    comment = described_class.new(content: nil)
    expect(comment).to_not be_valid
  end
end
