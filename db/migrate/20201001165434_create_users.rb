class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :login
      t.string :password
      t.string :email
      t.string :fullname
      t.string :birthday
      t.integer :user_role

      t.timestamps
    end
  end
end
