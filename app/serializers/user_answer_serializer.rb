class UserAnswerSerializer < ActiveModel::Serializer
  attributes :id,
             :question,
             :answer,
             :user,
             :is_correct

  belongs_to :user
  belongs_to :question
end
