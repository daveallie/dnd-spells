# frozen_string_literal: true

require 'json'

module SeedSetup
  class << self
    def gen_spell(**opts)
      spell_fields = %i[name casting_time range duration short_description description v s m ritual concentration
                        reference]
      spell = Spell.new(opts.slice(*spell_fields))
      spell.school = school(opts[:school])
      spell.save!
      opts[:masteries].each do |dnd_class|
        Mastery.create!(spell: spell, dnd_class: dnd_class(dnd_class))
      end
    end

    private

    def dnd_class(name)
      unless defined?(@dnd_classes)
        dnd_class_names = %w[Sorcerer Wizard Cleric Paladin Ranger Bard Druid Warlock]
        @dnd_classes = dnd_class_names.map do |n|
          [n, DndClass.create!(name: n)]
        end.to_h
      end
      @dnd_classes[name]
    end

    def school(name)
      unless defined?(@schools)
        school_names = %w[Conjuration Abjuration Transmutation Enchantment Necromancy Divination Evocation Illusion]
        @schools = school_names.map do |n|
          [n, School.create!(name: n)]
        end.to_h
      end
      @schools[name]
    end
  end
end

JSON.parse(File.read(File.join(File.dirname(__FILE__), 'spell_data.json'))).each do |s|
  s = s.symbolize_keys
  SeedSetup.gen_spell(**s)
end
