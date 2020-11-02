# == Schema Information
#
# Table name: questions
#
#  id                    :bigint      not null, primary key
#  page_id               :bigint      not null, foreign key
#  question_type         :integer     not null
#  question_text         :string      not null
#  difficult             :integer     not null
#  description           :string      not null
#  title                 :string      not null
#  page_id_and_title     :index
#
class Question < ApplicationRecord
  belongs_to :page
  has_many :answers, dependent: :destroy
  has_many :user_answers, dependent: :destroy
  has_many :variants, dependent: :destroy

  enum question_type: %i[closed opened]
  enum difficult: %i[easy medium hard]

  validates :title, :question_text, presence: true
end
