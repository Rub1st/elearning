class CertificateSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :user,
             :course,
             :certificate_pdf_url

  belongs_to :course
  belongs_to :user

  def certificate_pdf_url
    variant = object.certificate_pdf.variant(resize: '200x300')
    rails_representation_url(variant, only_path: true)
  end
end
