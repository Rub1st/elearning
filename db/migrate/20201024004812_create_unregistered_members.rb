class CreateUnregisteredMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :unregistered_members do |t|
      t.integer :member_role, null: false, default: 1
      t.references :organization, null: false, foreign_key: true
      t.string :code, null: false, unique: true, default: ''
      t.string :email, null: false, default: ''
      t.index %i[email organization_id], unique: true

      t.timestamps
    end
  end
end
