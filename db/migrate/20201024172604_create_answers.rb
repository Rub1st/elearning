class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.references :question, null: false, foreign_key: true
      t.string :value, null: false, default: ''
      t.integer :order, null: false, default: 1

      t.timestamps
    end
  end
end
