class Question < ApplicationRecord
  belongs_to :page

  enum question_type: %i[closed opened]
  enum difficult: %i[easy medium hard]
end
