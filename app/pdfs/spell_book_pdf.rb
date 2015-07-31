class SpellBookPdf < Prawn::Document
  def initialize(spells, view)
    super()
    @spells = spells.sort_by{|v| v['name']}
    @view = view
    header
    spell_info
  end

  def header
    # image "#{Rails.root}/public/ms-icon-310x310.png", height: 50
    text 'Spell List', size: 30, style: :bold, align: :center
  end

  def spell_info
    @spells.each do |spell|
      text spell['name'], size: 15, style: :bold
      # text spell.to_s
      table([
        #[{:content => spell['name'], :colspan => 3}],
        ['Level:', spell['level'], 'V:', table_icon(tick_cross(spell['v'])), {content: 'Description:<br />' + spell['description'], rowspan: 5}],
        ['School:', spell['school'], 'S:', table_icon(tick_cross(spell['s']))],
        ['Classes:', spell['classes'].join('<br />'), 'M:', table_icon(tick_cross(spell['m']))],
        ['Range:', spell['range'], 'Ritual:', table_icon(tick_cross(spell['m']))],
        ['Duration:', spell['duration'], 'Concentration:', table_icon(tick_cross(spell['m']))]
      ], column_widths: [60, 100, 90, 35, 255], cell_style: { :inline_format => true, size: 8, valign: :center }) do
        column(0).style align: :right
        column(2).style align: :right
        # values = cells.columns(1..-1).rows(1..-1)
        # yes_cells = values.filter do |cell|
        #   cell.content.to_s == 'YES'
        # end
        # no_cells = values.filter do |cell|
        #   cell.content.to_s == 'NO'
        # end
        #
        # yes_cells.
      end
      move_down 15
      # val_list = spell.reject{|k| k == 'created_at' || k == 'updated_at'}.values
      # val_list[-2] = val_list[-2].join(', ')
      # val_list.map{|val| val.to_s}
    end
  end

  def tick_cross boolean
    boolean ? 'fa-check' : 'fa-times'
  end
end