class HomeController < ApplicationController
  layout 'application_covered'

  # GET /spells, GET /
  def spells
    get_all_spells
    @spells = @spells.sort_by {|k, v| v['name']}
  end

  # GET /spells/:spell_code
  def spells_code
    @spell_code = params[:spell_code]
    spell_code_map = SpellCodeMap.where(key: @spell_code).first
    if spell_code_map
      spell_code_map.touch
      get_all_spells
      spell_code_map.spells.each do |spell_id|
        @spells[spell_id][:starred] = true
      end
      respond_to do |format|
        format.html do
          @spells = @spells.sort_by {|k, v| v['name']}
          render 'spells'
        end
        format.pdf do
          pdf = SpellBookPdf.new(spell_code_map.spells.map{|spell_id| @spells[spell_id]}, view_context)
          send_data pdf.render, filename: "spellbook_#{@spell_code}.pdf", type: 'application/pdf', disposition: 'inline'
        end
      end
    else
      redirect_to spells_path
    end
  end

  # POST /spells
  def update_spells
    require 'dnd-namer'

    key = params[:key]
    spell_ids = Spell.where(id: params[:spells]).pluck(:id)
    password = params[:password]
    status = 200

    if key == 'new'
      key = DndNamer.heroku
      scm = SpellCodeMap.new(key: key, spells: spell_ids, password: password)
      clashes = 0
      until scm.save
        key = DndNamer.heroku
        scm.key = key
        clashes += 1
      end
    else
      scm = SpellCodeMap.find_by(key: key)
      scm = scm.password_digest.nil? ? scm : scm.authenticate(password)

      if scm
        scm.spells = spell_ids
        scm.save
      else
        status = 403
      end
    end

    render json: {key: key}, status: status
  end

  # GET /dice
  def dice
  end

  def get_all_spells
    @spells = HashWithIndifferentAccess.new
    schools = HashWithIndifferentAccess.new
    dnd_classes = HashWithIndifferentAccess.new
    School.all.each{|school| schools[school.id] = school.name}
    Spell.all.each{|spell| @spells[spell.id] = spell.attributes.with_indifferent_access.reject{|k| k == 'id' || k == 'school_id'}.merge({school: schools[spell.school_id]})}

    DndClass.all.each{|dnd_class| dnd_classes[dnd_class.id] = dnd_class.name}
    Mastery.all.each{|mastery| (@spells[mastery.spell_id][:classes] ||= []) << dnd_classes[mastery.dnd_class_id]}
    @classes = DndClass.order(name: :asc).pluck(:name)
    @schools = schools.values.sort
  end
end
