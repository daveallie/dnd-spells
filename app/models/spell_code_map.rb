class SpellCodeMap < ActiveRecord::Base
  serialize :spells, Array
  validates_uniqueness_of :key
  has_secure_password validations: false

  has_many :spell_books
  has_many :users, through: :spell_books
end
