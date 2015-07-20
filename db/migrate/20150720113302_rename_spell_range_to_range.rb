class RenameSpellRangeToRange < ActiveRecord::Migration
  def change
    rename_column :spells, :spell_range, 'range'
  end
end
