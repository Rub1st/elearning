# == Schema Information
#
# Table name: user_answers
#
#  id          :bigint           not null, primary key
#  question_id :bigint           not null
#  answer      :string           default(""), not null
#  user_id     :bigint           not null
#  is_correct  :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class UserAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  validates :answer, presence: true
end
