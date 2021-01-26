class CoursePolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    user.present? && user.user_status == 'approved' && !user.admin?
  end

  def update?
    user.id == record.author_id || user.admin?
  end

  def destroy?
    user.admin?
  end
end
