class CreateSpellCodeMaps < ActiveRecord::Migration
  def change
    create_table :spell_code_maps do |t|
      t.string :key, null: false
      t.text :spells

      t.timestamps null: false
    end
    add_index :spell_code_maps, :key, :unique => true
  end
end
