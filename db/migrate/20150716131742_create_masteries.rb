class CreateMasteries < ActiveRecord::Migration
  def change
    create_table :masteries do |t|
      t.integer :spell_id
      t.integer :dnd_class_id

      t.timestamps null: false
    end
  end
end
