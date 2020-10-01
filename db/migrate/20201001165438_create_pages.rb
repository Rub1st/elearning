class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.references :course, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
