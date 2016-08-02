window.Spell = {};

Spell.init = function(spell_code) {
  var url = '/spells';

  if (spell_code) {
    url += '/' + spell_code;
  }

  $.getJSON(url, function(spells) {
    var $tableBody = $('.full-table tbody');

    spells.forEach(function(info) {
      var id = info[0],
          spell = info[1];

      var row1 = crel('tr', {'class': 'summary summary-visible', 'data-id': id, 'data-name': spell.name, 'data-level': spell.level,
          'data-school': spell.school, 'data-classes': JSON.stringify(spell.classes), 'data-vsmrc': JSON.stringify([spell.v, spell.s, spell.m, spell.ritual, spell.concentration]),
          'data-ref': spell.reference.slice(0, spell.reference.length - 5)},
        crel('td', {'class': 'expand', 'onselectstart': 'return false'},
          crel('span', {'class': 'glyphicon glyphicon-resize-full'})),
        crel('td',
          crel('i', {'class': 'starable fa fa-star' + (spell.starred ? '' : '-o')})),
        crel('td', spell.name),
        crel('td', {'style': 'text-align: center'}, spell.level === 0 ? 'Cantrip' : spell.level),
        crel('td', spell.school),
        crel('td', spell.classes.join(', ')),
        crel('td', {'style': 'text-align: center'},
          crel('span', {'class': 'glyphicon glyphicon-' + (spell.v ? 'ok' : 'remove')})),
        crel('td', {'style': 'text-align: center'},
          crel('span', {'class': 'glyphicon glyphicon-' + (spell.s ? 'ok' : 'remove')})),
        crel('td', {'style': 'text-align: center'},
          crel('span', {'class': 'glyphicon glyphicon-' + (spell.m ? 'ok' : 'remove')})),
        crel('td', {'style': 'text-align: center'},
          crel('span', {'class': 'glyphicon glyphicon-' + (spell.ritual ? 'ok' : 'remove')})),
        crel('td', {'style': 'text-align: center'},
          crel('span', {'class': 'glyphicon glyphicon-' + (spell.concentration ? 'ok' : 'remove')})),
        crel('td', spell.range),
        crel('td', spell.duration),
        crel('td', spell.casting_time)
      );

      var row2 = crel('tr', {'class': 'details details-display-none'},
        crel('td', {'colspan': 14},
          crel('table', {'class': 'table details-table', 'style': 'background-color: #e7e7e8'},
            crel('tr',
              spell.m ? crel('td', {'style': 'width: 30%'}, crel('h5', 'Material'), spell.material) : null,
              crel('td', crel('h5', 'Short Description'), spell.short_description),
              crel('td', {'style': 'width: 10%'}, crel('h5', 'Reference'), spell.reference)),
            crel('tr',
              crel('td', {'colspan': spell.m ? 3 : 2}, crel('h5', 'Description'), spell.description))
          ))
      );
      $tableBody.append($(row1)).append($(row2));
    });
    Spell.setup();
  });
};


Spell.setup = function() {
  var $full_table = $('.full-table');

  $.tablesorter.addParser({
    id: 'truefalse',
    is: function (s) {
      return false;
    },
    format: function (s, table, cell) {
      var $cell = $(cell);
      return $cell.children('i').attr('class') || s;
    },
    type: 'text'
  });

  $full_table.tablesorter({
    cssChildRow: 'details',
    sortList: [[1, 0]],
    sortForce: [[1, 0]],
    headers: {
      0: {sorter: false},
      1: {sorter: 'truefalse'},
      11: {sorter: false},
      12: {sorter: false},
      13: {sorter: false}
    }
  });

  $full_table.on('sortEnd', function(e) {
    Spell.Helpers.update_headers();
  });

  Spell.Handlers.apply($full_table);

  Spell.Helpers.update_spell_count();

  $(window).trigger('cover-ready');
};
