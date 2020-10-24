class Comment < ApplicationRecord
  belongs_to :course
  belongs_to :author, class_name: 'User'
end
