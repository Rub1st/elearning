class CertificateSerializer < ActiveModel::Serializer
  attributes :id,
             :user,
             :course,
             :certificate_pdf

  belongs_to :course
  belongs_to :user
end
