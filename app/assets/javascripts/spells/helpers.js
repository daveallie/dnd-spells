Spell.Helpers = {};

(function(s, h) {
  h.toggle_details_row = function(row) {
    var icon = $(row).prev('.summary').children('.expand').children();
    $(icon).toggleClass('glyphicon-resize-small');
    $(icon).toggleClass('glyphicon-resize-full');
    if ($(row).hasClass('details-visible')) {
      $(row).removeClass('details-visible');
      $(row).addClass('details-invisible');
    } else {
      $(row).removeClass('details-display-none details-invisible');
      $(row).addClass('details-visible');
    }
  };

  h.toggle_summary_row = function(row) {
    $(row).toggleClass('summary-visible');
    $(row).toggleClass('summary-invisible');
    if ($(row).hasClass('summary-invisible') && ($(row).next('.details').hasClass('details-visible'))) {
      h.toggle_details_row($(row).next('.details'));
    }
  };

  h.setToggleState = function (element, plus) {
    var $i = $(element).children('i');

    if (plus && $i.hasClass('fa-minus-square') || !plus && $i.hasClass('fa-plus-square')) {
      $i.toggleClass('fa-minus-square');
      $i.toggleClass('fa-plus-square');
    }
  };

  h.update_spell_count = function () {
    var len = $('.summary-visible').length,
        message = len + ' spell';

    if (len != 1)
      message += 's';
    $('.spell-count').html(message);
  };

  h.update_headers = function () {
    $('.sort-icon').each(function () {
      var $i = $(this),
          $header = $i.parent();

      $i.removeClass('glyph-grey');
      $i.removeClass('fa-sort');
      $i.removeClass('fa-sort-asc');
      $i.removeClass('fa-sort-desc');

      if ($header.hasClass('headerSortDown')) {
        $i.addClass('fa-sort-asc');
      } else if ($header.hasClass('headerSortUp')) {
        $i.addClass('fa-sort-desc');
      } else {
        $i.addClass('glyph-grey');
        $i.addClass('fa-sort');
      }
    });
  };
})(Spell, Spell.Helpers);
