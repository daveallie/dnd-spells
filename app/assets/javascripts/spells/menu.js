Spell.Menu = {};

(function(s, m) {
  m.toggleMenu = function () {
    var $menu = $('#side-menu'),
        $content = $('#main-content'),
        $menu_toggle = $('.menu-toggle'),
        $i = $menu_toggle.children('i');

    $menu.toggleClass("hide-menu");

    if ($menu.hasClass("hide-menu")) {
      $content.stop().animate({"margin-left": 20}, 500);
      $menu.stop().animate({"margin-left": -240}, 500);
      $menu_toggle.stop().animate({"margin-left": -15}, 500);
    } else {
      $content.stop().animate({"margin-left": 260}, 500);
      $menu.stop().animate({"margin-left": 0}, 500);
      $menu_toggle.stop().animate({"margin-left": 225}, 500);
    }
    $i.toggleClass('fa-chevron-left');
    $i.toggleClass('fa-chevron-right');
  };
})(Spell, Spell.Menu);
