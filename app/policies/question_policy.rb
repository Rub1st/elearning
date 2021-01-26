class QuestionPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def create?
    user.id == record.page.course.author_id
  end

  def destroy?
    user.present?
  end
end
