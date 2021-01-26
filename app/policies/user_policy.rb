class UserPolicy < ApplicationPolicy
  def update?
    user.id == record.id || user.admin?
  end

  def index?
    user.present?
  end

  def destroy?
    user.admin?
  end
end
