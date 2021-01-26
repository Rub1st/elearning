class ReportPolicy < ApplicationPolicy
  def create?
    RegisteredMember.find_by(organization_id: record.id, user_id: user.id, member_role: 0)
  end

  def index
    user.present?
  end
end
