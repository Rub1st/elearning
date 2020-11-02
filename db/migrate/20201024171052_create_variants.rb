class CreateVariants < ActiveRecord::Migration[6.0]
  def change
    create_table :variants do |t|
      t.integer :order, null: false, default: 1
      t.references :question, null: false, foreign_key: true
      t.string :value, null: false, default: ''
      t.index %i[question_id order], unique: true

      t.timestamps
    end
  end
end
