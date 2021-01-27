# == Schema Information
#
# Table name: organizations
#
#  id             :bigint           not null, primary key
#  name           :string           default(""), not null
#  description    :string           default(""), not null
#  approve_status :integer          default("pending"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class OrganizationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :name,
             :description,
             :approve_status,
             :certificate_template_url,
             :created_at

  has_many :registered_members

  def certificate_template_url
    url_for(object.certificate_template)
  end
end
