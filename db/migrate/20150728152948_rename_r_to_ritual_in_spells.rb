class RenameRToRitualInSpells < ActiveRecord::Migration
  def change
    rename_column :spells, :r, 'ritual'
  end
end
