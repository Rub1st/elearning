# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  content    :string           default(""), not null
#  author_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :course,
             :author,
             :content,
             :created_at

  belongs_to :course
  belongs_to :author
  has_many :replies
end
