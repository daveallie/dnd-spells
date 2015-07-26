class SpellCodeMap < ActiveRecord::Base
  serialize :spells, Array
  validates_uniqueness_of :key
end
