class CreateOrganizationMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :organization_members do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :member_role

      t.timestamps
    end
  end
end
