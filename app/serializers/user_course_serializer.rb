class UserCourseSerializer < ActiveModel::Serializer
  attributes :id,
             :user,
             :course,
             :current_page,
             :is_favorite,
             :progress,
             :correct,
             :mark,
             :created_at,
             :updated_at

  belongs_to :user
  belongs_to :course
end
