class PageSerializer < ActiveModel::Serializer
  attributes :id, :course, :order, :title

  belongs_to :course
  has_many :questions
  has_many :theories
end
