# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
  has_many :course_tags, dependent: :destroy

  validates :name, presence: true

  searchkick word_middle: %i[name]

  def search_data
    {
      name: name
    }
  end
end
