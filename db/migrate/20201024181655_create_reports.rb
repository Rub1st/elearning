class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.references :course, null: false, foreign_key: true
      t.float :percent_try, null: false, default: 0
      t.integer :count_try, null: false, default: 0
      t.integer :count_failed, null: false, default: 0
      t.integer :count_complete, null: false, default: 0
      t.float :average_mark

      t.timestamps
    end
  end
end
