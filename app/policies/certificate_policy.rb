class CertificatePolicy < ApplicationPolicy
  def index?
    !user.nil?
  end

  def create?
    !user.nil?
  end
end
