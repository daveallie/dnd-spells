# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_170_604_061_009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'dnd_classes', force: :cascade do |t|
    t.string 'name', null: false
  end

  create_table 'masteries', force: :cascade do |t|
    t.integer 'spell_id', null: false
    t.integer 'dnd_class_id', null: false
  end

  create_table 'schools', force: :cascade do |t|
    t.string 'name', null: false
  end

  create_table 'spells', force: :cascade do |t|
    t.string 'name', null: false
    t.integer 'level'
    t.integer 'school_id'
    t.string 'casting_time'
    t.string 'range'
    t.string 'material'
    t.string 'duration'
    t.string 'short_description'
    t.string 'description'
    t.boolean 'v', default: false, null: false
    t.boolean 's', default: false, null: false
    t.boolean 'm', default: false, null: false
    t.boolean 'ritual', default: false, null: false
    t.boolean 'concentration', default: false, null: false
    t.string 'reference'
  end
end
