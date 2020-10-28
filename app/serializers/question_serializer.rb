class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :page,
             :question_type,
             :title,
             :description,
             :question_text,
             :difficult

  belongs_to :page
end