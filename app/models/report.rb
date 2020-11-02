# == Schema Information
#
# Table name: reports
#
#  id                    :bigint      not null, primary key
#  course_id             :bigint      not null, foreign key
#  percent_try           :integer     not null
#  count_try             :integer     not null
#  count_failed          :integer     not null
#  count_complete        :integer     not null
#  average_mark          :float
#
class Report < ApplicationRecord
  belongs_to :course
end
