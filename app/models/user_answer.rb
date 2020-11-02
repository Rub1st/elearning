# == Schema Information
#
# Table name: user_answers
#
#  id           :bigint      not null, primary key
#  question_id  :bigint      not null, foreign key
#  user_id      :bigint      not null, foreign key
#  answer       :string      not null
#  is_correct   :boolean     not null
#
class UserAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  validates :answer, presence: true
end
