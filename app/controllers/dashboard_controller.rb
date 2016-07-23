include ActionView::Helpers::TextHelper

class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
    @spell_books = current_user.spell_books.order(sort_order: :desc).order(created_at: :desc)
  end

  def add_spell_book
    key = params[:key]
    render(json: {message: 'Missing key'}, status: 400) and return if key.nil?

    message = 'Failed to add new Spell List!'
    scm = SpellCodeMap.find_by(key: key)
    render(json: {message: 'No Spell Lists with that key exist!'}, status: 400) and return if scm.nil?

    if SpellBook.where(user_id: current_user, spell_code_map: scm).any?
      render(json: {message: 'You cannot have the two Spell Lists with the same key!'}, status: 400) and return
    end

    spell_book = SpellBook.new(user: current_user, spell_code_map: scm)
    render(json: {message: 'Failed to save your spell book!'}, status: 500) and return unless spell_book.save

    stats = scm.stats
    row = "<tr data-spell-book-id=#{spell_book.id}><td>
        <h3><a href='#{spell_code_path(scm.key)}'><span class='nickname'>#{spell_book.nickname.nil? ? scm.key : spell_book.nickname}</span></a> (#{scm.key})<i class='fa fa-edit edit-nick-btn' style='margin-left: 10px'></i><i class='fa fa-times delete-book-btn' style='margin-left: 2px;'></i></h3>
        <p>#{
          if scm.spells.count == 0 then
            'Contains no spells.'
          else
            "Contains #{pluralize(stats[:count], 'spell')}, for level #{stats[:levels].to_sentence}, #{stats[:classes].map { |dnd_class| dnd_class.pluralize }.to_sentence} from the #{stats[:schools].to_sentence} school#{stats[:schools].count == 1 ? '' : 's'} of magic."
          end}
        </p></td></tr>"
    render json: {row: row, id: spell_book.id}, status: 200
  end

  def update_spell_book
    head :bad_request and return if params[:nickname].nil?
    spell_book = SpellBook.find(params[:id])
    head :not_found and return if spell_book.nil? || spell_book.user_id != current_user.id

    nickname = params[:nickname].presence
    spell_book.nickname = nickname
    head :internal_server_error and return unless spell_book.save

    nickname = nickname || spell_book.spell_code_map.key
    render json: {nickname: nickname}
  end

  def delete_spell_book
    spell_book = SpellBook.find(params[:id])

    head :not_found and return if spell_book.nil? || spell_book.user_id != current_user.id
    head :internal_server_error and return unless spell_book.delete
    head :ok
  end
end
