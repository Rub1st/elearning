# == Schema Information
#
# Table name: replies
#
#  id                    :bigint      not null, primary key
#  comments_id           :bigint      not null, foreign key
#  author_id             :bigint      not null, foreign key
#  content               :string      not null
#
class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :author, class_name: 'User'

  validates :content, presence: true
end
