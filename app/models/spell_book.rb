class SpellBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :spell_code_map
end
