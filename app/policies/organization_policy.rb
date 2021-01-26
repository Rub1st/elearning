class OrganizationPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    user.present? && user.user_status == 'approved' && !user.admin?
  end

  def update?
    RegisteredMember.find_by(organization_id: record.id, user_id: user.id, member_role: 0) || user.admin?
  end

  def destroy?
    user.admin?
  end
end
