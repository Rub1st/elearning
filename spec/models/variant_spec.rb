require 'rails_helper'

RSpec.describe Variant, type: :model do
  it 'is valid with valid attributes' do
    user = User.create(email: 'dionis.rubis@gmail.com',
                       password: '123456',
                       login: 'Akira',
                       full_name: 'Denis Rubis')

    course = Course.create(label: 'Ruby',
                           why_content: '-',
                           will_content: '-',
                           author: user)

    page = Page.create(course: course,
                       title: 'So Lets Start')

    question = Question.create(page: page,
                               title: 'So Lets Start',
                               question_text: 'Choose right variants')

    expect(Variant.new(question: question,
                       value: 'b')).to be_valid
  end

  it 'is not valid without a value' do
    variant = Variant.new(value: nil)
    expect(variant).to_not be_valid
  end
end
