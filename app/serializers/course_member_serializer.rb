class CourseMemberSerializer < ActiveModel::Serializer
  attributes :id,
             :user,
             :course

  belongs_to :user
  belongs_to :course
end
