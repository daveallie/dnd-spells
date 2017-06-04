# frozen_string_literal: true

class InitialTableSetup < ActiveRecord::Migration[5.1]
  def change
    create_table :dnd_classes do |t|
      t.string :name, null: false
    end

    create_table :schools do |t|
      t.string :name, null: false
    end

    create_table :spells do |t|
      t.string :name, null: false
      t.integer :level
      t.integer :school_id
      t.string :casting_time
      t.string :range
      t.string :material
      t.string :duration
      t.string :range
      t.string :short_description
      t.string :description
      t.boolean :v, null: false, default: false
      t.boolean :s, null: false, default: false
      t.boolean :m, null: false, default: false
      t.boolean :ritual, null: false, default: false
      t.boolean :concentration, null: false, default: false
      t.string :reference
    end

    create_table :masteries do |t|
      t.integer :spell_id, null: false
      t.integer :dnd_class_id, null: false
    end
  end
end
