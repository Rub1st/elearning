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
