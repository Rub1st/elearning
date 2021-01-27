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
class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :page,
             :question_type,
             :title,
             :description,
             :question_text,
             :difficult

  belongs_to :page
  has_many :variants
end
