class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.references :course, null: false, foreign_key: true
      t.integer :order, null: false, default: 1
      t.string :title, null: false, default: ''
      t.index %i[course_id order], unique: true

      t.timestamps
    end
  end
end
