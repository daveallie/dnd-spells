# frozen_string_literal: true

class DndClass < ApplicationRecord
  has_many :masteries, dependent: :destroy
  has_many :spells, through: :masteries

  validates :name, presence: true
end
