# frozen_string_literal: true

class School < ApplicationRecord
  has_many :spells

  validates :name, presence: true
end
