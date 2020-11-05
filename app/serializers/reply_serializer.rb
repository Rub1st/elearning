class ReplySerializer < ActiveModel::Serializer
  attributes :id,
             :comment,
             :content,
             :author,
             :created_at

  belongs_to :comment
end
