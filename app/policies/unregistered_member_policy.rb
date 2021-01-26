class UnregisteredMemberPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def create?
    RegisteredMember.find_by(organization_id: record.id, user_id: user.id, member_role: 0)
  end

  def destroy?
    user.present?
  end
end
