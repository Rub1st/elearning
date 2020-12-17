class PagePolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    user.id == record.course.author.id
  end

  def update?
    user.id == record.course.author.id
  end

  def destroy?
    user.admin?
  end
end
