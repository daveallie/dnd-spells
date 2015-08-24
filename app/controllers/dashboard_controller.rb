class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
    @spell_books = current_user.spell_books.order(sort_order: :desc).order(created_at: :asc)
  end

  def update_spell_book
    status = 200
    nickname = params[:nickname]
    if params[:id].nil? || params[:nickname].nil?
      status = 500
    else
      spell_book = SpellBook.find(params[:id])
      if !signed_in? || spell_book.user_id != current_user.id
        status = 403
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
    status = 200
    if params[:id].nil?
      puts 'no id'
      status = 500
    else
      spell_book = SpellBook.find(params[:id])
      if !signed_in? || spell_book.user_id != current_user.id
        status = 403
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
