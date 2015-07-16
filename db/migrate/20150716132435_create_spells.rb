class CreateSpells < ActiveRecord::Migration
  def change
    create_table :spells do |t|
      t.string :name
      t.integer :level
      t.integer :school_id
      t.string :casting_time
      t.string :spell_range
      t.string :component
      t.string :duration
      t.text :short_description
      t.text :description

      t.timestamps null: false
    end
  end
end
