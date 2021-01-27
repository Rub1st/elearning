# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  course_id  :bigint           not null
#  content    :string           default(""), not null
#  author_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
  belongs_to :course
  belongs_to :author, class_name: 'User'
  has_many :replies, dependent: :destroy

  validates :content, presence: true

  scope :search_import, -> { includes(:author, :course) }

  searchkick word_middle: %i[content]

  def search_data
    {
      content: content,
      course_label: course.label,
      author_login: author.login
    }
  end
end
