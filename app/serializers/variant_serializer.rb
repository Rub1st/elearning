class VariantSerializer < ActiveModel::Serializer
  attributes :id,
             :order,
             :question,
             :value,
             :is_correct

  belongs_to :question
end
