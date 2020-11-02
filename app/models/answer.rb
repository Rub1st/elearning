# == Schema Information
#
# Table name: answers
#
#  id           :bigint      not null, primary key
#  question_id  :bigint      not null, foreign key
#  value        :string      not null
#  order        :integer     not null
#
class Answer < ApplicationRecord
  belongs_to :question

  validates :value, presence: true
end
