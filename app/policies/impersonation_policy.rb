class ImpersonationPolicy < ApplicationPolicy
  def index?
    user.admin?
  end
end
