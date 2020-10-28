class PageSerializer < ActiveModel::Serializer
  attributes :id, :course, :order, :title

  belongs_to :course
  has_many :questions
end
