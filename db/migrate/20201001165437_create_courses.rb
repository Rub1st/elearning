class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.integer :access_type
      t.integer :course_status
      t.string :image

      t.timestamps
    end
  end
end
