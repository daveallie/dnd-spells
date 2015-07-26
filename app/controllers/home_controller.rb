class HomeController < ApplicationController
  # GET /spells
  def spells
    get_all_spells
  end

  # GET /spells/:spell_code
  def spells_code
    spell_code_map = SpellCodeMap.where(key: params[:spell_code]).first
    if spell_code_map
      spell_code_map.touch
      get_all_spells
      @spell_code = params[:spell_code]
      spell_code_map.spells.each do |spell_id|
        @spells[spell_id][:starred] = true
      end
    else
      redirect_to spells_path
      return
    end
    @spells = @spells.sort_by {|k, v| v['name']}
    render 'spells'
  end

  # POST /spells
  def update_spells
    require 'dnd-namer'

    key = params[:key]
    spell_ids = Spell.where(id: params[:spells]).pluck(:id)

    if key == 'new'
      key = DndNamer.heroku
      scm = SpellCodeMap.new(key: key, spells: spell_ids)
      while !scm.save
        key = DndNamer.heroku
        scm.key = key
      end
    else
      scm = SpellCodeMap.find_by(key: key)
      scm.spells = spell_ids
      scm.save
    end

    render json: {key: key}
  end

  # GET /dice
  def dice
  end

  def get_all_spells
    @spells = HashWithIndifferentAccess.new
    schools = HashWithIndifferentAccess.new
    School.all.each{|school| schools[school.id] = school.name}
    Spell.all.each{|spell| @spells[spell.id] = spell.attributes.with_indifferent_access.reject{|k| k == 'id' || k == 'school_id'}.merge({school: schools[spell.school_id]})}
    Spell.joins(:dnd_classes).select('spells.id, dnd_classes.name').each{|spell_class| (@spells[spell_class.id][:classes] ||= []) << spell_class.name}
    @classes = DndClass.order(name: :asc).pluck(:name)
    @schools = schools.values.sort
  end
end
