Spell.Handlers = {};

(function(s, h) {
  var expandClick = function() {
    var details = $(this).parent().next('.details');
    s.Helpers.toggle_details_row(details);
  };

  var updateDisplay = function(hasTrue, hasFalse, $toggleItems, cb) {
    if (!hasTrue) {
      Spell.Helpers.setToggleState($toggleItems, true);
      Spell.Filters.filter_all();
    } else if ($(this).is(':checked')) {
      if (!hasFalse) setToggleState($toggleItems, false);
      Spell.Filters.filter_all();
    } else {
      $('.summary-visible').each(cb);
      Spell.Helpers.update_spell_count();
    }
  };

  var levelCheckboxClick = function() {
    var okLevels = $('.level-checkbox').map(function() { return $(this).is(':checked'); }),
        hasTrue = $.inArray(true, okLevels) != -1,
        hasFalse = $.inArray(false, okLevels) != -1;

    updateDisplay(hasTrue, hasFalse, $('#toggle-level'), function () {
      if (!okLevels[$(this).data('level')])
        s.Helpers.toggle_summary_row(this);
    });
  };

  var schoolCheckboxClick = function() {
    var okSchools = {},
        hasTrue = false,
        hasFalse = false;

    $('.school-checkbox').each(function() {
      var checked = $(this).is(':checked');
      okSchools[$(this).attr('value')] = checked;
      if (checked) {
        hasTrue = true;
      } else {
        hasFalse = true;
      }
    });

    updateDisplay(hasTrue, hasFalse, $('#toggle-school'), function () {
      if (!okSchools[$(this).data('school')])
        s.Helpers.toggle_summary_row(this);
    });
  };

  var classCheckboxClick = function() {
    var okClasses = {},
        hasTrue = false,
        hasFalse = false;

    $('.class-checkbox').each(function() {
      var checked = $(this).is(':checked');
      okClasses[$(this).attr('value')] = checked;
      if (checked) {
        hasTrue = true;
      } else {
        hasFalse = true;
      }
    });

    updateDisplay(hasTrue, hasFalse, $('#toggle-class'), function () {
      if (!s.Filters.any_in_map($(this).data('classes'), okClasses))
        s.Helpers.toggle_summary_row(this);
    });
  };

  var vsmrcCheckboxClick = function() {
    var okVsmrc = $('.vsmrc-checkbox').map(function() { return $(this).is(':checked'); }),
        vsmrcData,
        hasTrue = $.inArray(true, okVsmrc) != -1,
        hasFalse = $.inArray(false, okVsmrc) != -1;

    updateDisplay(hasTrue, hasFalse, $('#toggle-vsmrc'), function () {
      vsmrcData = $(this).data('vsmrc');
      if ((!okVsmrc[0] || okVsmrc[0] && !vsmrcData[0]) &&
          (!okVsmrc[1] || okVsmrc[1] && !vsmrcData[1]) &&
          (!okVsmrc[2] || okVsmrc[2] && !vsmrcData[2]) &&
          (!okVsmrc[3] || okVsmrc[3] && !vsmrcData[3]) &&
          (!okVsmrc[4] || okVsmrc[4] && !vsmrcData[4]))
        Spell.Helpers.toggle_summary_row(this);
    });
  };

  var refCheckboxClick = function() {
    var okRef = {},
        hasTrue = false,
        hasFalse = false;

    $('.ref-checkbox').each(function() {
      var checked = $(this).is(':checked');
      okRef[$(this).attr('value')] = checked;
      if (checked) {
        hasTrue = true;
      } else {
        hasFalse = true;
      }
    });

    updateDisplay(hasTrue, hasFalse, $('#toggle-ref'), function () {
      if (!okRef[$(this).data('ref')])
        Spell.Helpers.toggle_summary_row(this);
    });
  };

  h.apply = function($full_table) {
    $('.expand').click(expandClick);
    $('.level-checkbox').click(levelCheckboxClick);
    $('.school-checkbox').click(schoolCheckboxClick);
    $('.class-checkbox').click(classCheckboxClick);
    $('.vsmrc-checkbox').click(vsmrcCheckboxClick);
    $('.ref-checkbox').click(refCheckboxClick);

    $('.search-box').on('input', function() {
      Spell.Filters.filter_all();
    });

    $('.menu-toggle').click(function(e) {
      e.preventDefault();
      Spell.Menu.toggleMenu();
    });

    $('.details').each(function() {
      this.addEventListener("transitionend", function () {
        if ($(this).hasClass('details-invisible')) {
          $(this).addClass('details-display-none');
          $(this).removeClass('details-invisible');
        }
      }, true);
    });

    $('.toggle-all').click(function() {
      var $i = $(this).children('i'),
          toggle_class = $(this).data('toggle-class'),
          new_checked = $i.hasClass('fa-plus-square');

      $('.'+toggle_class).prop('checked', new_checked);

      $i.toggleClass('fa-plus-square');
      $i.toggleClass('fa-minus-square');
      Spell.Filters.filter_all();
    });

    if (findBootstrapEnvironment() == 'xs') {
      Spell.Menu.toggleMenu();
    }

    $('.save-button').click(function() {
      var is_update = $(this).attr('id') === 'save-update',
          spell_code = (is_update ? $('#spell-code').html() : null) || 'new',
          spells_ids = $('.fa-star.starable').map(function() { return $(this).parent().parent().data('id');}).toArray(),
          password = null,
          message = is_update ? '(leave blank if no password was set when the spell list was created)' : '(setting a password will prevent others from changing your list, leave blank for no password)';

      message = crel('span', 'Password for Spell List:',
        crel('br'),
        crel('span', {'style': 'font-size: small'}, message)
      );

      bootbox.prompt({
        title: message,
        inputType: "password",
        callback: function(password) {
          if (password !== null) {
            Spell.Saving.save(spells_ids, spell_code, password);
          }
        }
      });
    });

    $('.starable').click(function() {
      $(this).toggleClass('fa-star');
      $(this).toggleClass('fa-star-o');
      $full_table.trigger('update');

      var $save_button = $('#save-new');
      if ($(this).hasClass('fa-star') || $('.fa-star.starable').length > 0)
        $save_button.show();
      else
        $save_button.hide();
    });
  };
})(Spell, Spell.Handlers);
