# == Schema Information
#
# Table name: theories
#
#  id         :bigint           not null, primary key
#  title      :string           default("")
#  content    :text             default("")
#  page_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Theory < ApplicationRecord
  belongs_to :page

  has_one_attached :image
end
