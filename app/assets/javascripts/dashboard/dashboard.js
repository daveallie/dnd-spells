window.Dashboard = {}

Dashboard.init = function() {
  $('.edit-nick-btn').on('click', function() {
    Dashboard.Saving.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parent().find('.nickname'))
  })

  $('.delete-book-btn').on('click', function() {
    Dashboard.Delete.bootbox($(this).parents('tr').data('spell-book-id'), $(this).parents('tr'))
  })
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

  //Consts: {
  //  SAVE_SUCCESS_MESSAGE: 'Successfully saved your spell list.',
  //  UPDATE_SUCCESS_MESSAGE: 'Successfully updated your spell list.',
  //  SAVE_FAIL_MESSAGE: 'Failed to save your spell list.',
  //  UPDATE_FAIL_MESSAGE: 'Failed to update your spell list.',
  //  UPDATE_AUTH_FAIL_MESSAGE: 'Password incorrect! Spell list was not updated.'
  //},

  save_success: function (data, nick_span) {
    $(nick_span).html(data.nickname)
  },

  save_fail: function (jqXHR, textStatus) {
  },

  save: function (id, nickname, nick_span) {
    Dashboard.Saving.ajax_save(Dashboard.Saving.save_success, Dashboard.Saving.save_fail, id, nickname, nick_span)
  },

  ajax_save: function (success_funct, fail_funct, id, nickname, nick_span) {
    $.ajax({
      url: "/spell_book",
      type: "POST",
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

  delete_success: function (data, spell_book_row) {
    $(spell_book_row).remove()
  },

  delete_fail: function (jqXHR, textStatus) {
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