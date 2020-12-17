class UnregisteredMemberPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    manager?
  end

  def destroy?
    manager?
  end

  private

  def manager?
    RegisteredMember.where(organization_id: record.id, member_role: 0, user_id: user.id).count.is_positive?
  end
end
