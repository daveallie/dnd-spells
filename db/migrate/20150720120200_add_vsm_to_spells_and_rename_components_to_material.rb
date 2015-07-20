class AddVsmToSpellsAndRenameComponentsToMaterial < ActiveRecord::Migration
  def change
    add_column :spells, 'v', :boolean, null: false, default: false
    add_column :spells, 's', :boolean, null: false, default: false
    add_column :spells, 'm', :boolean, null: false, default: false
    rename_column :spells, :component, 'material'
  end
end
