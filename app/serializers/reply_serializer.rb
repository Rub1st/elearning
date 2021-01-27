# == Schema Information
#
# Table name: replies
#
#  id         :bigint           not null, primary key
#  comment_id :bigint           not null
#  content    :string           default(""), not null
#  author_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ReplySerializer < ActiveModel::Serializer
  attributes :id,
             :comment,
             :content,
             :author,
             :created_at

  belongs_to :comment
  belongs_to :author
end
