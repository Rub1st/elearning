class ImpersonationPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  # ?
  def create?
    !user.nil?
  end

  # ?
  def update?
    !user.nil?
  end
end
