class UserCoursePolicy < ApplicationPolicy
  def create?
    user.present?
  end

  def update?
    user.id == record.user_id
  end

  def index?
    record.all { |item| item.user_id == user.id }
  end
end
