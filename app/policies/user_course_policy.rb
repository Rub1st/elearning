class UserAnswerPolicy < ApplicationPolicy
  # ?
  def create?
    !user.nil?
  end

  def update?
    user.id == record.user.id
  end

  def index?
    !user.nil?
  end
end
