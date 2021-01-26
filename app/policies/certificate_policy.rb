class CertificatePolicy < ApplicationPolicy
  def index?
    !user.nil? && record.all { |item| item.user_id == user.id }
  end
end
