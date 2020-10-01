class CreateUserAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_answers do |t|
      t.references :question, null: false, foreign_key: true
      t.references :user_course, null: false, foreign_key: true
      t.boolean :is_correct
      t.string :answer

      t.timestamps
    end
  end
end
