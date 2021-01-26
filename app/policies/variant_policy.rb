class VariantPolicy < ApplicationPolicy
  def create?
    user.id == record.question.page.course.author_id
  end

  def destroy?
    user.id == record.question.page.course.author_id
  end
end
