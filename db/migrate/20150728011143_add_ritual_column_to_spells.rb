class AddRitualColumnToSpells < ActiveRecord::Migration
  def change
    add_column :spells, :r, :boolean, null: false, default: false
  end
end
