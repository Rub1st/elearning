class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :page, null: false, foreign_key: true
      t.integer :question_type, null: false, default: 0
      t.string :title, null: false, default: ''
      t.string :description, default: ''
      t.string :question_text, null: false, default: ''
      t.integer :difficult, null: false, default: 0
      t.index %i[page_id title], unique: true

      t.timestamps
    end
  end
end
