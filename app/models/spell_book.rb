class SpellBook < ApplicationRecord
  belongs_to :user
  belongs_to :spell_code_map
end
