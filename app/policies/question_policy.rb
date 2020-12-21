class QuestionPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    !user.nil?
  end

  def destroy?
    user.admin?
  end
end
