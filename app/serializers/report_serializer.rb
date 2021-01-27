# == Schema Information
#
# Table name: reports
#
#  id             :bigint           not null, primary key
#  course_id      :bigint           not null
#  percent_try    :float            default(0.0), not null
#  count_try      :integer          default(0), not null
#  count_failed   :integer          default(0), not null
#  count_complete :integer          default(0), not null
#  average_mark   :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class ReportSerializer < ActiveModel::Serializer
  attributes :id,
             :percent_try,
             :count_try,
             :count_failed,
             :count_complete,
             :average_mark,
             :created_at

  has_one :course
end
