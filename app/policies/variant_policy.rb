class VariantPolicy < ApplicationPolicy
  def create?
    !user.nil?
  end

  def destroy?
    !user.nil?
  end
end
