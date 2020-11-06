class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :label, null: false, default: ''
      t.float :mark
      t.string :why_content, null: false, default: ''
      t.string :will_content, null: false, default: ''
      t.integer :uses_count, null: false, default: 0
      t.float :success_rate, null: false, default: 0
      t.integer :access_type, null: false, default: 0
      t.integer :approve_status, null: false, default: 0
      t.references :organization, null: true, foreign_key: true
      t.integer :course_status, null: false, default: 0
      t.references :author, foreign_key: { to_table: 'users' }
      t.index %i[author_id label], unique: true

      t.timestamps
    end
  end
end
