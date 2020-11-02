class CreateUserCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :user_courses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.integer :current_page, null: false, default: 1
      t.boolean :is_favorite, null: false, default: false
      t.float :progress, null: false, default: 0
      t.float :correct, null: false, default: 100
      t.float :mark
      t.index %i[user_id course_id], unique: true

      t.timestamps
    end
  end
end
