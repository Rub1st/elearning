class ReplyPolicy < ApplicationPolicy
  def create?
    !user.nil?
  end

  def destroy?
    user.id == record.author.id
  end
end
