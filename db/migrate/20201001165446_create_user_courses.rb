class CreateUserCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :user_courses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.boolean :is_favorite
      t.float :progress
      t.float :mark
      t.integer :course_status

      t.timestamps
    end
  end
end
