class TagPolicy < ApplicationPolicy
  def create?
    user&.admin?
  end

  def update?
    user.admin?
  end

  def index
    true
  end
end
