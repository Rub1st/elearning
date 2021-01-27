# == Schema Information
#
# Table name: pages
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  order      :integer          default(1), not null
#  title      :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Page < ApplicationRecord
  belongs_to :course
  has_many :questions, dependent: :destroy
  has_many :theories, dependent: :destroy

  validates :title, presence: true
end
