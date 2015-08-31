window.Dashboard = {}

Dashboard.init = function() {
  $('.edit-nick-btn').on('click', function() {
    Dashboard.Saving.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parent().find('.nickname'))
  })

  $('.delete-book-btn').on('click', function() {
    Dashboard.Delete.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parents('tr'))
  })

  $('.add-book-btn').on('click', function() {
    Dashboard.Add.bootbox($(this).parents('table'))
  })
}

Dashboard.Add = {
  bootbox: function(table) {
    bootbox.prompt({
      title: "Existing Spell Book Key",
      inputType: "text",
      callback: function(key) {
        if (key != null) {
          Dashboard.Add.save(key, table)
        }
      }
    })
  },

  Consts: {
    SUCCESS_MESSAGE: 'Successfully added Spell List',
    FAILURE_MESSAGE: 'Failed to add Spell List'
  },

  save_success: function (data) {
    var $success_flash = $('#save-update-success-message')
    $('.save-update-message').hide()
    $success_flash.children('span').html(Dashboard.Add.Consts.SUCCESS_MESSAGE)
    $success_flash.show(300)

    var $table = $('#spell-list')
      , $message = $('#no-spell-list-message')

    if ($table.hasClass('hidden')) {
      $message.addClass('hidden')
      $table.removeClass('hidden')
    }

    // Insert row at top of table
    $table.prepend(data.row)

    $row = $('tr[data-spell-book-id="' + data.id + '"]')

    $row.find('.edit-nick-btn').on('click', function() {
      Dashboard.Saving.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parent().find('.nickname'))
    })

    $row.find('.delete-book-btn').on('click', function() {
      Dashboard.Delete.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parents('tr'))
    })
  },

  save_fail: function (jqXHR, textStatus) {
    var $fail_flash = $('#save-update-fail-message')
    $('.save-update-message').hide()
    $fail_flash.children('span').html(jqXHR.responseJSON.message || Dashboard.Add.Consts.FAILURE_MESSAGE)
    $fail_flash.show(300)
  },

  save: function (key) {
    Dashboard.Add.ajax_save(Dashboard.Add.save_success, Dashboard.Add.save_fail, key)
  },

  ajax_save: function (success_funct, fail_funct, key) {
    $.ajax({
      url: "/spell_book",
      type: "POST",
      data: {
        key: key
      },
      dataType: "json"
    }).done(function (data) {
      success_funct(data)
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR)
      fail_funct(jqXHR, textStatus)
    });
  }
}

Dashboard.Saving = {
  bootbox: function(spell_book_id, nick_span) {
    bootbox.prompt({
      title: "New Spell List Nickname",
      inputType: "text",
      callback: function(nickname) {
        if (nickname != null) {
          Dashboard.Saving.save(spell_book_id, nickname, nick_span)
        }
      }
    })
  },

  Consts: {
    SUCCESS_MESSAGE: 'Successfully saved Spell List',
    FAILURE_MESSAGE: 'Failed to save Spell List'
  },

  save_success: function (data, nick_span) {
    var $success_flash = $('#save-update-success-message')
    $('.save-update-message').hide()
    $success_flash.children('span').html(Dashboard.Saving.Consts.SUCCESS_MESSAGE)
    $success_flash.show(300)

    $(nick_span).html(data.nickname)
  },

  save_fail: function (jqXHR, textStatus) {
    var $fail_flash = $('#save-update-fail-message')
    $('.save-update-message').hide()
    $fail_flash.children('span').html(Dashboard.Saving.Consts.FAILURE_MESSAGE)
    $fail_flash.show(300)
  },

  save: function (id, nickname, nick_span) {
    Dashboard.Saving.ajax_save(Dashboard.Saving.save_success, Dashboard.Saving.save_fail, id, nickname, nick_span)
  },

  ajax_save: function (success_funct, fail_funct, id, nickname, nick_span) {
    $.ajax({
      url: "/spell_book",
      type: "PUT",
      data: {
        id: id,
        nickname: nickname
      },
      dataType: "json"
    }).done(function (data) {
      success_funct(data, nick_span)
    }).fail(function (jqXHR, textStatus) {
      fail_funct(jqXHR, textStatus)
    });
  }
}

Dashboard.Delete = {
  bootbox: function(spell_book_id, row) {
    bootbox.confirm("Are you sure you want to delete this list from your spell lists? (it can be added back with the add button)", function(result) {
      if (result) {
        Dashboard.Delete.delete(spell_book_id, row)
      }
    });
  },

  Consts: {
    SUCCESS_MESSAGE: 'Successfully deleted Spell List',
    FAILURE_MESSAGE: 'Failed to delete Spell List'
  },

  delete_success: function (data, spell_book_row) {
    var $success_flash = $('#save-update-success-message')
    $('.save-update-message').hide()
    $success_flash.children('span').html(Dashboard.Delete.Consts.SUCCESS_MESSAGE)
    $success_flash.show(300)

    var $table = $('#spell-list')
      , $message = $('#no-spell-list-message')

    if ($table.find('tr').length == 1) {
      $table.addClass('hidden')
      $message.removeClass('hidden')
    }

    $(spell_book_row).remove()
  },

  delete_fail: function (jqXHR, textStatus) {
    var $fail_flash = $('#save-update-fail-message')
    $('.save-update-message').hide()
    $fail_flash.children('span').html(Dashboard.Delete.Consts.FAILURE_MESSAGE)
    $fail_flash.show(300)

  },

  delete: function (id, spell_book_row) {
    Dashboard.Delete.ajax_delete(Dashboard.Delete.delete_success, Dashboard.Delete.delete_fail, id, spell_book_row)
  },

  ajax_delete: function (success_funct, fail_funct, id, spell_book_row) {
    $.ajax({
      url: "/spell_book",
      type: "DELETE",
      data: {
        id: id
      },
      dataType: "json"
    }).done(function (data) {
      success_funct(data, spell_book_row)
    }).fail(function (jqXHR, textStatus) {
      fail_funct(jqXHR, textStatus)
    });
  }
}