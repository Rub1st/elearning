class OrganizationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :name,
             :description,
             :approve_status,
             :certificate_template_url,
             :created_at

  has_many :registered_members
  # has_many :impersonations
  # has_many :unregistered_members

  def certificate_template_url
    url_for(object.certificate_template)
  end
end
