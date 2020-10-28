class VariantSerializer < ActiveModel::Serializer
  attributes :id,
             :order,
             :question,
             :value

  belongs_to :question
end
