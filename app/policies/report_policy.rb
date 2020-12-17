class ReportPolicy < ApplicationPolicy
  # ?
  def create?
    !user.nil?
  end

  # ?
  def index
    !user.nil?
  end
end
