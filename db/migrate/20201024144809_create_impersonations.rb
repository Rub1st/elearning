class CreateImpersonations < ActiveRecord::Migration[6.0]
  def change
    create_table :impersonations do |t|
      t.datetime :start, null: false
      t.datetime :end, null: false
      t.references :manager, foreign_key: { to_table: 'users' }
      t.references :common, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
