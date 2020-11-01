class TheorySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :title,
             :content,
             :image_url,
             :page

  belongs_to :page

  def image_url
    variant = object.image.variant(resize: '200x200')
    rails_representation_url(variant, only_path: true)
  end
end
