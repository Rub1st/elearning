class Question < ApplicationRecord
  belongs_to :page
  has_many :answers, dependent: :destroy
  has_many :user_answers, dependent: :destroy
  has_many :variants, dependent: :destroy

  enum question_type: %i[closed opened]
  enum difficult: %i[easy medium hard]
end
