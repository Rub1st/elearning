class CertificateSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,
             :user,
             :course,
             :certificate_pdf_url,
             :created_at

  belongs_to :course
  belongs_to :user

  def certificate_pdf_url
    url_for(object.certificate_pdf) if object.certificate_pdf.attached?
  end
end
