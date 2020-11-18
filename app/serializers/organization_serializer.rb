class OrganizationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :name,
             :description,
             :approve_status,
             :certificate_template_url,
             :created_at

  has_many :registered_members
  has_many :unregistered_members

  def certificate_template_url
    variant = object.certificate_template.variant(resize: '200x300')
    rails_representation_url(variant, only_path: true)
  end
end
