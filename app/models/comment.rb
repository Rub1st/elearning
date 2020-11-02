# == Schema Information
#
# Table name: comments
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  author_id             :bigint      not null, foreign key
#  content               :string      not null
#
class Comment < ApplicationRecord
  belongs_to :course
  belongs_to :author, class_name: 'User'
  has_many :replies, dependent: :destroy

  validates :content, presence: true
end
