class AnswerSerializer < ActiveModel::Serializer
  attributes :id,
             :question,
             :value,
             :order

  belongs_to :question
end
