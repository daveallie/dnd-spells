class AddPasswordDigestToSpellCodeMap < ActiveRecord::Migration
  def change
    add_column :spell_code_maps, :password_digest, :string
  end
end
