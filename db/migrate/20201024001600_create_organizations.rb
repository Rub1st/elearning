class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :name,            null: false, default: '', unique: true
      t.string :description,     null: false, default: ''
      t.integer :approve_status, null: false, default: 0

      t.timestamps
    end
  end
end
