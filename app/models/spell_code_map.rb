class SpellCodeMap < ActiveRecord::Base
  serialize :spells, Array
  validates_uniqueness_of :key
  has_secure_password validations: false
end
