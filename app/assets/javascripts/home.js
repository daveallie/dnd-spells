$(document).ready(function() {
  var $full_table = $('.full-table')

  $full_table.tablesorter({
      cssChildRow: 'details'
    , sortList: [[1, 0]]
    , headers: {0: {sorter: false}}
  })

  $full_table.on('sortEnd', function(e) {
    update_headers()
  })

  $('.expand').click(function() {
    var details = $(this).parent().next('.details')
    if ($(details).hasClass('details-visible'))
      hide_details_row(details)
    else
      show_details_row(details)
  })

  $('.level-checkbox').click(function() {
    var ok_levels = $('.level-checkbox').map(function() { return $(this).is(':checked') })

    if ($(this).is(':checked'))
      filter_all()
    else
      $('.summary-visible').each(function() {
        if (!ok_levels[$(this).data('level')])
          hide_summary_row(this)
      })
    update_spell_count()
  })

  $('.school-checkbox').click(function() {
    var ok_schools = {}
    $('.school-checkbox').each(function() { ok_schools[$(this).attr('value')] = $(this).is(':checked')})

    if ($(this).is(':checked'))
      filter_all()
    else
      $('.summary-visible').each(function() {
        if (!ok_schools[$(this).data('school')])
          hide_summary_row(this)
      })
    update_spell_count()
  })

  $('.class-checkbox').click(function() {
    var ok_classes = {}
    $('.class-checkbox').each(function() { ok_classes[$(this).attr('value')] = $(this).is(':checked')})

    if ($(this).is(':checked'))
      filter_all()
    else
      $('.summary-visible').each(function() {
        if (!any_in_map($(this).data('classes'), ok_classes))
          hide_summary_row(this)
      })
    update_spell_count()
  })

  $('.vsm-checkbox').click(function() {
    var ok_vsm = $('.vsm-checkbox').map(function() { return $(this).is(':checked') })
      , vsm_data

    if ($(this).is(':checked'))
      filter_all()
    else
      $('.summary-visible').each(function() {
        vsm_data = $(this).data('vsm')
        if ((!ok_vsm[0] && vsm_data[0]) || (!ok_vsm[1] && vsm_data[1]) || (!ok_vsm[2] && vsm_data[2]))
          hide_summary_row(this)
      })
    update_spell_count()
  })

  var search_box = $('.search-box')

  $(search_box).change(function() {
    filter_all()
  })

  $(search_box).on('input', function() {
    $(this).change()
  })

  $('.menu-toggle').click(function(e) {
    e.preventDefault();
    toggleMenu();
  });

  if (findBootstrapEnvironment() == 'xs') {
    toggleMenu();
  }
  update_spell_count()

  $('#cover').fadeOut(1000);
})

function any_in_map(keys, map) {
  var found = false
  for (var i = 0; i < keys.length; i++) {
    if (map[keys[i]]) {
      found = true
      break
    }
  }
  return found
}

function hide_details_row(row) {
  $(row).removeClass('details-visible')
  $(row).addClass('details-invisible')
  var icon = $(row).prev('.summary').children('.expand').children()
  $(icon).removeClass('glyphicon-resize-small')
  $(icon).addClass('glyphicon-resize-full')
}

function show_details_row(row) {
  $(row).removeClass('details-invisible')
  $(row).addClass('details-visible')
  var icon = $(row).prev('.summary').children('.expand').children()
  $(icon).removeClass('glyphicon-resize-full')
  $(icon).addClass('glyphicon-resize-small')

}

function hide_summary_row(row) {
  $(row).removeClass('summary-visible')
  $(row).addClass('summary-invisible')
  if ($(row).next('.details').hasClass('details-visible')) {
    hide_details_row($(row).next('.details'))
  }
}

function show_summary_row(row) {
  $(row).removeClass('summary-invisible')
  $(row).addClass('summary-visible')
}

function filter_all() {
  var ok_levels = $('.level-checkbox').map(function() { return $(this).is(':checked') })
    , ok_schools = {}
    , ok_classes = {}
    , name = $('.search-box').val().toLowerCase().trim()
  $('.school-checkbox').each(function() { ok_schools[$(this).attr('value')] = $(this).is(':checked')})
  $('.class-checkbox').each(function() { ok_classes[$(this).attr('value')] = $(this).is(':checked')})

  $('.summary').each(function() {
    if (ok_levels[$(this).data('level')] && ok_schools[$(this).data('school')] && any_in_map($(this).data('classes'), ok_classes) && (name.length == 0 || $(this).data('name').toLowerCase().indexOf(name) >= 0)) {
      if ($(this).hasClass('summary-invisible'))
        show_summary_row(this)
    } else {
      if ($(this).hasClass('summary-visible'))
        hide_summary_row(this)
    }
  })
}

function update_spell_count() {
  var len = $('.summary-visible').length
    , message = len + ' spell'
  if (len != 1)
    message += 's'
  $('.spell-count').html(message)
}

function toggleMenu() {
  var $menu = $('#side-menu')
    , $content = $('#main-content')
    , $menu_toggle = $('.menu-toggle')
    , $span = $menu_toggle.children('span')
  $menu.toggleClass("hide-menu");
  if ($menu.hasClass("hide-menu")) {
    $content.stop().animate({"margin-left" : 20}, 500);
    $menu.stop().animate({"margin-left": -240}, 500);
    $menu_toggle.stop().animate({"margin-left": -52}, 500)
  } else {
    $content.stop().animate({"margin-left" : 260}, 500);
    $menu.stop().animate({"margin-left": 0}, 500);
    $menu_toggle.stop().animate({"margin-left": 188}, 500)
  }
  $span.toggleClass('glyphicon-backward')
  $span.toggleClass('glyphicon-forward')
}

function update_headers() {
  $('th').not('.expand-header').each(function() {
    var $span = $(this).children('span')
    $span.removeClass('glyph-grey')
    $span.removeClass('glyphicon-arrow-down')
    $span.removeClass('glyphicon-arrow-up')

    if ($(this).hasClass('headerSortDown'))
      $span.addClass('glyphicon-arrow-up')
    else if ($(this).hasClass('headerSortUp'))
      $span.addClass('glyphicon-arrow-down')
    else {
      $span.addClass('glyph-grey')
      $span.addClass('glyphicon-arrow-down')
    }
  })
}

function findBootstrapEnvironment() {
  var envs = ['xs', 'sm', 'md', 'lg']
    , $el = $('<div>')

  $el.appendTo($('body'))

  for (var i = envs.length - 1; i >= 0; i--) {
    var env = envs[i]

    $el.addClass('hidden-'+env)
    if ($el.is(':hidden')) {
      $el.remove()
      return env
    }
  }
}
