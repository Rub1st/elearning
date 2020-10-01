class CreateReplyComments < ActiveRecord::Migration[6.0]
  def change
    create_table :reply_comments do |t|
      t.references :comment, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
