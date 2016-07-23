class DndClass < ApplicationRecord
  has_many :masteries, dependent: :destroy
  has_many :spells, through: :masteries
end
