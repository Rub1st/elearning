class TheorySerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :content,
             :image,
             :page

  belongs_to :page
end
