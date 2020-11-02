# == Schema Information
#
# Table name: impersonations
#
#  id                    :bigint      not null, primary key
#  start                 :datetime    not null
#  end                   :datetime    not null
#  manager_id            :bigint      not null, foreign key
#  common_id             :bigint      not null, foreign key
#
class Impersonation < ApplicationRecord
  belongs_to :manager, class_name: 'User'
  belongs_to :common, class_name: 'User'
end
