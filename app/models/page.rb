# == Schema Information
#
# Table name: pages
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  order                 :integer     not null
#  title                 :string      not null
#  course_id_and_order   :index
#
class Page < ApplicationRecord
  belongs_to :course
  has_many :questions, dependent: :destroy

  validates :title, presence: true
end
