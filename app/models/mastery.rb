# frozen_string_literal: true

class Mastery < ApplicationRecord
  belongs_to :dnd_class
  belongs_to :spell
end
