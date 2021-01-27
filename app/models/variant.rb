# == Schema Information
#
# Table name: variants
#
#  id          :bigint           not null, primary key
#  order       :integer          default(1), not null
#  question_id :bigint           not null
#  value       :string           default(""), not null
#  is_correct  :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Variant < ApplicationRecord
  belongs_to :question

  validates :value, presence: true
end
