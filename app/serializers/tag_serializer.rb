class TagSerializer < ActiveModel::Serializer
  attributes :id,
             :name

  # has_many :course_tags
end
