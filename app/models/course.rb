# == Schema Information
#
# Table name: courses
#
#  id                    :bigint      not null, primary key
#  label                 :string      not null
#  author_id             :bigint      not null, foreign key
#  mark                  :float
#  why_content           :string      not null
#  will_content          :string      not null
#  uses_count            :integer     not null
#  success_rate          :integer     not null
#  access_type           :integer     not null
#  approve_status        :integer     not null
#  organization_id       :bigint      not null, foreign key
#  author_id_and_label   :index
#
class Course < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :author, class_name: 'User'
  has_many :reports
  has_many :certificates, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :course_tags, dependent: :destroy
  has_many :tags, through: :course_tags
  has_many :pages, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :course_members, dependent: :destroy

  has_one_attached :image

  enum course_status: %i[draft ready]
  enum approve_status: %i[pending rejected approved]
  enum access_type: %i[opened closed individual]

  validates :label, :why_content, :will_content, presence: true

  searchkick word_middle: %i[label why_conent will_content]


  def search_data
    {
      label: label,
      will_content: will_content,
      why_content: why_content,
      author_login: author.login,
      tags_name: tags.map(&:name)
    }
  end
end
