class DndClass < ActiveRecord::Base
  has_many :masteries
  has_many :spells, through: :masteries
end
