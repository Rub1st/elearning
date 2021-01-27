# == Schema Information
#
# Table name: theories
#
#  id         :bigint           not null, primary key
#  title      :string           default("")
#  content    :text             default("")
#  page_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TheorySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :title,
             :content,
             :image_url,
             :page

  belongs_to :page

  def image_url
    url_for(object.image) if object.image.attached?
  end
end
