class SpellCodeMap < ApplicationRecord
  serialize :spells, Array
  validates_uniqueness_of :key
  has_secure_password validations: false

  has_many :spell_books
  has_many :users, through: :spell_books

  def stats
    spells = Spell.where(id: self.spells)
    {
        count: self.spells.count,
        schools: School.where(id: spells.pluck(:school_id).uniq).pluck(:name),
        classes: DndClass.joins(:masteries).where('masteries.spell_id in (?)', self.spells).uniq.pluck(:name),
        levels: spells.pluck(:level).uniq.sort
    }
  end
end
