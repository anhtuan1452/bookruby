class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :isbn, null: false
      t.integer :published_year, null: false
      t.text :description
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end
    
    add_index :books, :isbn, unique: true
  end
end
