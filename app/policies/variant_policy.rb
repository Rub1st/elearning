class VariantPolicy < ApplicationPolicy
  def create?
    user.id == record.question.page.course.author.id
  end

  def destroy?
    user.id == record.question.page.course.author.id
  end
end
