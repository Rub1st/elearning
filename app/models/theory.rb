# == Schema Information
#
# Table name: theories
#
#  id                    :bigint      not null, primary key
#  page_id               :bigint      not null, foreign key
#  content               :string      not null
#  title                 :string      not null
#  page_id_and_title     :index
#
class Theory < ApplicationRecord
  belongs_to :page

  has_one_attached :image
end
