module DashboardHelper
  def scm_stats(scm)
    spells = Spell.where(id: scm.spells)
    {
        count: scm.spells.count,
        schools: School.where(id: spells.pluck(:school_id).uniq).pluck(:name),
        classes: DndClass.joins(:masteries).where('masteries.spell_id in (?)', scm.spells).uniq.pluck(:name),
        levels: spells.pluck(:level).uniq.sort
    }
  end
end
