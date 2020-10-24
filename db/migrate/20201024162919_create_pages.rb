class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.references :course, null: false, foreign_key: true
      t.integer :order, null: false, default: 0
      t.string :title, null: false, default: ''

      t.timestamps
    end
  end
end
