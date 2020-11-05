class CreateUserAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_answers do |t|
      t.references :question, null: false, foreign_key: true
      t.string :answer, null: false, default: ''
      t.references :user, null: false, foreign_key: true
      t.boolean :is_correct, null: false, default: false
      t.index %i[question_id answer], unique: true

      t.timestamps
    end
  end
end
