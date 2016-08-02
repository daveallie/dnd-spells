class HomeController < ApplicationController
  layout 'application_covered'

  # GET /spells, GET /
  def spells
    get_schools
    get_classes

    respond_to do |format|
      format.json {
        get_all_spells
        render json: @spells.sort_by {|k, v| v['name']}.to_json
      }
      format.html {}
    end
  end

  # GET /spells/:spell_code
  def spells_code
    @spell_code = params[:spell_code]
    spell_code_map = SpellCodeMap.find_by(key: @spell_code)
    if spell_code_map
      get_schools
      get_classes

      respond_to do |format|
        format.html do
          spell_code_map.touch
          render 'spells'
        end
        format.json do
          get_all_spells
          spell_code_map.spells.each do |spell_id|
            @spells[spell_id][:starred] = true
          end
          render json: @spells.sort_by {|k, v| v['name']}.to_json
        end
        format.pdf do
          get_all_spells
          spell_code_map.spells.each do |spell_id|
            @spells[spell_id][:starred] = true
          end
          @spells = @spells.sort_by {|k, v| v['name']}
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
        head :not_found and return
      end
    end

    render json: {key: key}, status: status
  end

  # GET /dice
  def dice
  end

  def get_schools
    @schools ||= begin
      schools = HashWithIndifferentAccess.new
      School.all.each{|school| schools[school.id] = school.name}
      schools
    end
  end

  def get_classes
    @classes ||= DndClass.order(name: :asc).pluck(:name)
  end

  def get_all_spells
    @spells = HashWithIndifferentAccess.new
    dnd_classes = HashWithIndifferentAccess.new
    Spell.all.each{|spell| @spells[spell.id] = spell.attributes.with_indifferent_access.reject{|k| k == 'id' || k == 'school_id'}.merge({school: get_schools[spell.school_id]})}

    DndClass.all.each{|dnd_class| dnd_classes[dnd_class.id] = dnd_class.name}
    Mastery.all.each{|mastery| (@spells[mastery.spell_id][:classes] ||= []) << dnd_classes[mastery.dnd_class_id]}
  end
end
