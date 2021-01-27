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
class Report < ApplicationRecord
  belongs_to :course
end
