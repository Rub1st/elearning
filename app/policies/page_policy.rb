class PagePolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def create?
    user.id == record.author_id
  end

  def update?
    user.id == record.author_id
  end

  def destroy?
    user.present?
  end
end
