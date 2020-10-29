class CreateRegisteredMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :registered_members do |t|
      t.integer :member_role, null: false, default: 1
      t.references :organization, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
