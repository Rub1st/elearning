class UserPolicy < ApplicationPolicy
  # ?
  def update?
    !user.nil?
  end

  def index?
    !user.nil?
  end
end
