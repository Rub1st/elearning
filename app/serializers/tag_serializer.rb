# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TagSerializer < ActiveModel::Serializer
  attributes :id,
             :name
end
