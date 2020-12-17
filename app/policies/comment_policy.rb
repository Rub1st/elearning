class CommentPolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    !user.nil?
  end

  def destroy?
    user.id == record.author_id
  end
end
