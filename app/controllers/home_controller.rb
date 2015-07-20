class HomeController < ApplicationController
  def index
    @spells = HashWithIndifferentAccess.new
    schools = HashWithIndifferentAccess.new
    School.all.each{|school| schools[school.id] = school.name}
    Spell.all.each{|spell| @spells[spell.id] = spell.attributes.with_indifferent_access.reject{|k| k == 'id' || k == 'school_id'}.merge({school: schools[spell.school_id]})}
    Spell.joins(:dnd_classes).select('spells.id, dnd_classes.name').each{|spell_class| (@spells[spell_class.id][:classes] ||= []) << spell_class.name}
    @classes = DndClass.order(name: :asc).pluck(:name)
    @schools = schools.values.sort
  end
end
