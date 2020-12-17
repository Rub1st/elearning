class TheoryPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    user.id == record.page.course.author.id
  end

  def update?
    user.id == record.page.course.author.id
  end

  def destroy?
    user.admin?
  end
end
