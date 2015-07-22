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
    toggle_details_row(details)
  })

  $('.level-checkbox').click(function() {
    var ok_levels = $('.level-checkbox').map(function() { return $(this).is(':checked') })

    if ($(this).is(':checked'))
      filter_all()
    else
      $('.summary-visible').each(function() {
        if (!ok_levels[$(this).data('level')])
          toggle_summary_row(this)
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
          toggle_summary_row(this)
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
          toggle_summary_row(this)
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
          toggle_summary_row(this)
      })
    update_spell_count()
  })

  var search_box = $('.search-box')

  //$(search_box).change(function() {
  //  filter_all()
  //})

  $(search_box).on('input', function() {
    filter_all()
  })

  //$(search_box).keyup(function() {
  //  $(this).change()
  //})

  $('.menu-toggle').click(function(e) {
    e.preventDefault();
    toggleMenu();
  });

  $('.details').each(function() {
    this.addEventListener("transitionend", function () {
      if ($(this).hasClass('details-invisible')) {
        $(this).addClass('details-display-none')
        $(this).removeClass('details-invisible')
      }
    }, true);
  })

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

function toggle_details_row(row) {
  var icon = $(row).prev('.summary').children('.expand').children()
  $(icon).toggleClass('glyphicon-resize-small')
  $(icon).toggleClass('glyphicon-resize-full')
  if ($(row).hasClass('details-visible')) {
    $(row).removeClass('details-visible')
    $(row).addClass('details-invisible')
  } else {
    $(row).removeClass('details-display-none details-invisible')
    $(row).addClass('details-visible')
  }
}

function toggle_summary_row(row) {
  $(row).toggleClass('summary-visible')
  $(row).toggleClass('summary-invisible')
  if ($(row).hasClass('summary-invisible') && ($(row).next('.details').hasClass('details-visible'))) {
    toggle_details_row($(row).next('.details'))
  }
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
        toggle_summary_row(this)
    } else {
      if ($(this).hasClass('summary-visible'))
        toggle_summary_row(this)
    }
  })
  update_spell_count()
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
    , $i = $menu_toggle.children('i')
  $menu.toggleClass("hide-menu");
  if ($menu.hasClass("hide-menu")) {
    $content.stop().animate({"margin-left" : 20}, 500);
    $menu.stop().animate({"margin-left": -240}, 500);
    $menu_toggle.stop().animate({"margin-left": -15}, 500)
  } else {
    $content.stop().animate({"margin-left" : 260}, 500);
    $menu.stop().animate({"margin-left": 0}, 500);
    $menu_toggle.stop().animate({"margin-left": 225}, 500)
  }
  $i.toggleClass('fa-chevron-left')
  $i.toggleClass('fa-chevron-right')
}

function update_headers() {
  $('th').not('.expand-header').each(function() {
    var $i = $(this).children('i')
    $i.removeClass('glyph-grey')
    $i.removeClass('fa-sort')
    $i.removeClass('fa-sort-asc')
    $i.removeClass('fa-sort-desc')

    if ($(this).hasClass('headerSortDown'))
      $i.addClass('fa-sort-asc')
    else if ($(this).hasClass('headerSortUp'))
      $i.addClass('fa-sort-desc')
    else {
      $i.addClass('glyph-grey')
      $i.addClass('fa-sort')
    }
  })
}
