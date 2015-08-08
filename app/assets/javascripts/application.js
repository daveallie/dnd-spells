// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require bootstrap-sprockets
//= require bootbox.min.js

<!-- Begin Inspectlet Embed Code -->
window.__insp = window.__insp || [];
__insp.push(['wid', 116609357]);
(function() {
  function __ldinsp(){var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
  document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', __ldinsp) : window.addEventListener('load', __ldinsp, false)) : __ldinsp();
})();
  <!-- End Inspectlet Embed Code -->

//$(document).on('page:change', function() {
//  if (window._gaq != null) {
//    return _gaq.push(['_trackPageview']);
//  } else if (window.pageTracker != null) {
//    return pageTracker._trackPageview();
//  }
//});

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