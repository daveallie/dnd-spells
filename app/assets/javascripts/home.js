$(document).ready(function() {
  $('.full-table').tablesorter({cssChildRow: 'details'})

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

  update_spell_count()
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