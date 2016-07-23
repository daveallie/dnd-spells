include ActionView::Helpers::TextHelper

class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
    @spell_books = current_user.spell_books.order(sort_order: :desc).order(created_at: :desc)
  end

  def add_spell_book
    params = params.permit([:key]).to_h
    status = 200
    message = 'Failed to add new Spell List!'
    if (key = params[:key]).nil?
      status = 400
    else
      scm = SpellCodeMap.find_by(key: key)
      if !signed_in?
        status = 401
      elsif scm.nil?
        status = 401
        message = 'No Spell Lists with that key exist!'
      else
        if SpellBook.where(user_id: current_user, spell_code_map: scm).count > 0
          message = 'You cannot have the two Spell Lists with the same key!'
          status = 400
        else
          spell_book = SpellBook.new(user: current_user, spell_code_map: scm)
          unless spell_book.save
            status = 500
          end
        end
      end
    end

    if status == 200
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
    else
      render json: {message: message}, status: status
    end
  end

  def update_spell_book
    params = params.permit([:nickname, :id]).to_h
    status = 200
    nickname = params[:nickname]
    if params[:id].nil? || params[:nickname].nil?
      status = 400
    else
      spell_book = SpellBook.find(params[:id])
      if !signed_in? || spell_book.user_id != current_user.id
        status = 401
      else
        nickname = nil if nickname.empty?
        spell_book.nickname = nickname
        unless spell_book.save
          status = 500
        end

        nickname = spell_book.spell_code_map.key if nickname.nil?
      end
    end

    render json: {nickname: nickname}, status: status
  end

  def delete_spell_book
    params = params.permit([:id]).to_h
    status = 200
    if params[:id].nil?
      status = 400
    else
      spell_book = SpellBook.find(params[:id])
      if !signed_in? || spell_book.user_id != current_user.id
        status = 401
      else
        unless spell_book.delete
          puts 'bad delete'
          status = 500
        end
      end
    end
    render json: {}, status: status
  end
end
