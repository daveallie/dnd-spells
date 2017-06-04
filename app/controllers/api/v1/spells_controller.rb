# frozen_string_literal: true

class Api::V1::SpellsController < Api::V1::BaseController
  def index
    respond_with Spell.all
  end
end
