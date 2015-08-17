class CreateSpellBooks < ActiveRecord::Migration
  def change
    create_table :spell_books do |t|
      t.integer :user_id
      t.integer :spell_code_map_id

      t.timestamps null: false
    end
  end
end
