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
