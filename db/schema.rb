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

ActiveRecord::Schema.define(version: 20150824110147) do

  create_table "dnd_classes", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "masteries", force: :cascade do |t|
    t.integer  "spell_id"
    t.integer  "dnd_class_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "schools", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spell_books", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "spell_code_map_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "nickname"
    t.integer  "sort_order"
  end

  create_table "spell_code_maps", force: :cascade do |t|
    t.string   "key",             null: false
    t.text     "spells"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.index ["key"], name: "index_spell_code_maps_on_key", unique: true
  end

  create_table "spells", force: :cascade do |t|
    t.string   "name"
    t.integer  "level"
    t.integer  "school_id"
    t.string   "casting_time"
    t.string   "range"
    t.string   "material"
    t.string   "duration"
    t.text     "short_description"
    t.text     "description"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.boolean  "v",                 default: false, null: false
    t.boolean  "s",                 default: false, null: false
    t.boolean  "m",                 default: false, null: false
    t.boolean  "ritual",            default: false, null: false
    t.boolean  "concentration",     default: false, null: false
    t.string   "reference"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",               default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "email",                  default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
