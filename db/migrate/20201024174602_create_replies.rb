class CreateReplies < ActiveRecord::Migration[6.0]
  def change
    create_table :replies do |t|
      t.references :comment, null: false, foreign_key: true
      t.string :content, null: false, default: ''
      t.references :author, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
