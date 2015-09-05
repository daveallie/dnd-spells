class AddNicknameToSpellBook < ActiveRecord::Migration
  def change
    add_column :spell_books, :nickname, :string
  end
end
