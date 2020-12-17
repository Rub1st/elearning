# == Schema Information
#
# Table name: tags
#
#  id           :bigint      not null, primary key
#  name         :string      not null
#
class Tag < ApplicationRecord
  has_many :course_tags, dependent: :destroy

  searchkick word_middle: %i[name]

  def search_data
    {
      name: name
    }
  end

  validates :name, presence: true
end
