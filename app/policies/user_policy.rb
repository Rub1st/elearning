class UserPolicy < ApplicationPolicy
  # ?
  def update?
    user.id == record.id || user.admin?
  end

  def index?
    !user.nil?
  end
end
