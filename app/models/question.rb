# == Schema Information
#
# Table name: questions
#
#  id            :bigint           not null, primary key
#  page_id       :bigint           not null
#  question_type :integer          default("closed"), not null
#  title         :string           default(""), not null
#  description   :string           default("")
#  question_text :string           default(""), not null
#  difficult     :integer          default("easy"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Question < ApplicationRecord
  belongs_to :page
  has_many :user_answers, dependent: :destroy
  has_many :variants, dependent: :destroy

  enum question_type: { closed: 0, opened: 1 }
  enum difficult: { easy: 0, medium: 1, hard: 2 }

  validates :title, :question_text, presence: true
end
