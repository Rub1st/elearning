# == Schema Information
#
# Table name: courses
#
#  id              :bigint           not null, primary key
#  label           :string           default(""), not null
#  mark            :float
#  why_content     :string           default(""), not null
#  will_content    :string           default(""), not null
#  uses_count      :integer          default(0), not null
#  success_rate    :float            default(0.0), not null
#  access_type     :integer          default("opened"), not null
#  approve_status  :integer          default("pending"), not null
#  organization_id :bigint
#  course_status   :integer          default("draft"), not null
#  author_id       :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Course < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :author, class_name: 'User'
  has_many :reports, dependent: :destroy
  has_many :certificates, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :course_tags, dependent: :destroy
  has_many :tags, through: :course_tags
  has_many :pages, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :course_members, dependent: :destroy

  has_one_attached :image

  enum course_status: { draft: 0, ready: 1 }
  enum approve_status: { pending: 0, rejected: 1, approved: 2 }
  enum access_type: { opened: 0, closed: 1, individual: 2 }

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
