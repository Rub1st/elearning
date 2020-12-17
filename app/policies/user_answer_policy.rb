class UserAnswerPolicy < ApplicationPolicy
  def create?
    user.id == record.user.id
  end
end
