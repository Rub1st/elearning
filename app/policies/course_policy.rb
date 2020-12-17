class CoursePolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    !user.nil?
  end

  def update?
    user.id == record.author_id
  end

  def destroy?
    user.admin?
  end
end
