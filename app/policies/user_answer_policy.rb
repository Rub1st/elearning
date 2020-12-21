class UserAnswerPolicy < ApplicationPolicy
  def create?
    user.common?
  end
end
