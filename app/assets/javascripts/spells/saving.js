
Spell.Saving = {};

(function(s, ss) {
  var messages = {
    SAVE_SUCCESS_MESSAGE: 'Successfully saved your spell list.',
    UPDATE_SUCCESS_MESSAGE: 'Successfully updated your spell list.',
    SAVE_FAIL_MESSAGE: 'Failed to save your spell list.',
    UPDATE_FAIL_MESSAGE: 'Failed to update your spell list.',
    UPDATE_AUTH_FAIL_MESSAGE: 'Password incorrect! Spell list was not updated.'
  };

  ss.save_update_success = function (data, update) {
    var new_key = data.key,
        $spell_code = $('#spell-code'),
        $success_flash = $('#save-update-success-message');

    $('.save-update-message').hide();
    if (update) {
      $success_flash.children('span').html(messages.UPDATE_SUCCESS_MESSAGE);
    } else {
      $success_flash.children('span').html(messages.SAVE_SUCCESS_MESSAGE);
      history.pushState('', '', '/spells/' + new_key);
    }
    $success_flash.show(300);

    $spell_code.html(new_key);
    $spell_code.show();
    $('#save-new').html('Save as new');
    $('.save-button').show();
  };

  ss.save_update_fail = function (jqXHR, textStatus, update) {
    var $fail_flash = $('#save-update-fail-message');

    $('.save-update-message').hide();
    if (update) {
      if (jqXHR.status == 403) {
        $fail_flash.children('span').html(messages.UPDATE_AUTH_FAIL_MESSAGE);
      } else {
        $fail_flash.children('span').html(messages.UPDATE_FAIL_MESSAGE);
      }
    } else {
      $fail_flash.children('span').html(messages.SAVE_FAIL_MESSAGE);
    }
    $fail_flash.show(300);
  };

  ss.save = function (data, key, password) {
    ss.ajax_save(ss.save_update_success, ss.save_update_fail, data, key, password);
  };

  ss.ajax_save = function (success_funct, fail_funct, data, key, password) {
    key = key || 'new';
    var update = key != 'new';

    $.ajax({
      url: "/spells",
      type: "POST",
      data: {
        key: key,
        spells: data,
        password: password
      },
      dataType: "json"
    }).done(function (data) {
      success_funct(data, update);
    }).fail(function (jqXHR, textStatus) {
      fail_funct(jqXHR, textStatus, update);
    });
  };
})(Spell, Spell.Saving);
