# == Schema Information
#
# Table name: user_courses
#
#  id           :bigint           not null, primary key
#  user_id      :bigint           not null
#  course_id    :bigint           not null
#  current_page :integer          default(1), not null
#  is_favorite  :boolean          default(FALSE), not null
#  progress     :float            default(0.0), not null
#  correct      :float            default(100.0), not null
#  mark         :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
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
