class PageSerializer < ActiveModel::Serializer
  attributes :id, :course, :order, :title

  belongs_to :course
end
