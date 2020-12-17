class OrganizationPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    !user.nil?
  end

  def update?
    RegisteredMember.where(organization_id: record_id, user_id: user.id).count.is_positive?
  end

  def destroy?
    user.admin?
  end
end
