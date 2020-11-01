class PageSerializer < ActiveModel::Serializer
  attributes :id,
             :course,
             :order,
             :title,
             :theories

  belongs_to :course
  has_many :questions
  has_many :theories

  def theories
    Theory.with_attached_image.where(page_id: object.id)
  end
end
