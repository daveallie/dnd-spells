class AddOrderToSpellBook < ActiveRecord::Migration
  def change
    add_column :spell_books, :sort_order, :integer
  end
end
