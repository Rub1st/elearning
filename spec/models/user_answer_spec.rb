require 'rails_helper'

RSpec.describe UserAnswer, type: :model do
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

    expect(UserAnswer.new(question: question,
                          user: user,
                          answer: 'b')).to be_valid
  end

  it 'is not valid without a answer' do
    user_answer = UserAnswer.new(answer: nil)
    expect(user_answer).to_not be_valid
  end
end
