class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :course, null: false, foreign_key: true
      t.string :content, null: false, default: ''
      t.references :author, foreign_key: { to_table: 'users' }
      t.timestamps
    end
  end
end
