class SpellBookPdf < Prawn::Document
  def initialize(spells, view)
    super()
    @spells = spells
    spell_info
  end

  def spell_info
    text 'asdf'
  end
end