class AddConcentrationAndReferenceColumnsToSpells < ActiveRecord::Migration
  def change
    add_column :spells, :concentration, :boolean, null: false, default: false
    add_column :spells, :reference, :string
  end
end
