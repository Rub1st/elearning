class CreateCourseTags < ActiveRecord::Migration[6.0]
  def change
    create_table :course_tags do |t|
      t.references :course, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.index %i[course_id tag_id], unique: true

      t.timestamps
    end
  end
end
