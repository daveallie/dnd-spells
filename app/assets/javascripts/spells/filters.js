Spell.Filters = {};

(function(s, f) {
  f.any_in_map = function (keys, map) {
    var found = false;
    for (var i = 0; i < keys.length; i++) {
      if (map[keys[i]]) {
        found = true;
        break;
      }
    }
    return found;
  };

  f.filter_all = function () {
    var ok_levels = $('.level-checkbox').map(function () { return $(this).is(':checked'); }),
        ok_vsmrc = $('.vsmrc-checkbox').map(function () { return $(this).is(':checked'); }),
        vsmrc_data,
        ok_schools = {},
        schools_en = false,
        ok_classes = {},
        classes_en = false,
        ok_ref = {},
        ref_en = false,
        name = $('.search-box').val().toLowerCase().trim();

    $('.school-checkbox').each(function () {
      var checked = $(this).is(':checked');
      ok_schools[$(this).attr('value')] = checked;
      schools_en = schools_en || checked;
    });

    $('.class-checkbox').each(function () {
      var checked = $(this).is(':checked');
      ok_classes[$(this).attr('value')] = checked;
      classes_en = classes_en || checked;
    });

    $('.ref-checkbox').each(function () {
      var checked = $(this).is(':checked');
      ok_ref[$(this).attr('value')] = checked;
      ref_en = ref_en || checked;
    });

    if ($.inArray(true, ok_vsmrc) == -1) {
      ok_vsmrc = [true, true, true, true];
    }
    if ($.inArray(true, ok_levels) == -1) {
      ok_levels = [true, true, true, true, true, true, true, true, true, true];
    }
    if (!schools_en) {
      for (var school in ok_schools)
        ok_schools[school] = true;
    }
    if (!classes_en) {
      for (var class_name in ok_classes)
        ok_classes[class_name] = true;
    }
    if (!ref_en) {
      for (var reference in ok_ref)
        ok_ref[reference] = true;
    }

    $('.summary').each(function () {
      vsmrc_data = $(this).data('vsmrc');

      if (ok_levels[$(this).data('level')] && (
          (ok_vsmrc[0] && vsmrc_data[0]) ||
          (ok_vsmrc[1] && vsmrc_data[1]) ||
          (ok_vsmrc[2] && vsmrc_data[2]) ||
          (ok_vsmrc[3] && vsmrc_data[3]) ||
          (ok_vsmrc[4] && vsmrc_data[4])) &&
        ok_schools[$(this).data('school')] &&
        f.any_in_map($(this).data('classes'), ok_classes) &&
        ok_ref[$(this).data('ref')] && (
          name.length === 0 || $(this).data('name').toLowerCase().indexOf(name) >= 0)) {
        if ($(this).hasClass('summary-invisible')) {
          s.Helpers.toggle_summary_row(this);
        }
      } else {
        if ($(this).hasClass('summary-visible')) {
          s.Helpers.toggle_summary_row(this);
        }
      }
    });
    s.Helpers.update_spell_count();
  };
})(Spell, Spell.Filters);
