class Impersonation < ApplicationRecord
  belongs_to :manager, class_name: 'User'
  belongs_to :common, class_name: 'User'
end
