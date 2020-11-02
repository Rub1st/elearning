# == Schema Information
#
# Table name: variants
#
#  id                     :bigint      not null, primary key
#  question_id            :bigint      not null, foreign key
#  value                  :string      not null
#  order                  :integer     not null
#  question_id_and_order  :index
#
class Variant < ApplicationRecord
  belongs_to :question

  validates :value, presence: true
end
