# frozen_string_literal: true

class Spell < ApplicationRecord
  belongs_to :school
  has_many :masteries, dependent: :destroy
  has_many :dnd_classes, through: :masteries

  validates :name, presence: true
end
