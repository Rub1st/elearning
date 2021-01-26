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
  belongs_to :organization

  searchkick word_middle: %i[start end]

  def search_data
    {
      start: start,
      end: :end,
      manager_login: manager.login,
      common_login: common.login,
      organization_name: organization.name
    }
  end
end
