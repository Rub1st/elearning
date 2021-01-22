class UserCoursePolicy < ApplicationPolicy
  def create?
    !user.nil?
  end

  def update?
    user&.common?
  end

  def index?
    !user.nil?
  end
end
