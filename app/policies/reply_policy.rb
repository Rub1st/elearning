class ReplyPolicy < ApplicationPolicy
  def create?
    user.present? && !user.admin?
  end

  def destroy?
    user.admin? || user.id == record.author_id
  end
end
