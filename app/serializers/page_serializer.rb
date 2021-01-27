# == Schema Information
#
# Table name: pages
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  order      :integer          default(1), not null
#  title      :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
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
