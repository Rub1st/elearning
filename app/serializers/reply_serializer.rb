class ReplySerializer < ActiveModel::Serializer
  attributes :id,
             :comment,
             :content,
             :author

  belongs_to :comment
end
