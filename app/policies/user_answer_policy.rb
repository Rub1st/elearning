class UserAnswerPolicy < ApplicationPolicy
  def create?
    user.id == record.user_id && user.common?
  end
end
