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
