Rails.application.routes.draw do
  root 'home#spells'
  get  'spells' => 'home#spells'
  get  'spells/:spell_code' => 'home#spells_code', as: 'spell_code'
  post 'spells' => 'home#update_spells'
  get  'dice'=> 'home#dice'
  post 'spell_book' => 'dashboard#update_spell_book'
  delete 'spell_book' => 'dashboard#delete_spell_book'

  # devise_for :user, path: '', path_names: {
  #                     sign_in: 'login', sign_out: 'logout',
  #                     sign_up: 'register', password: 'forgot',
  #                     edit: 'edit/profile' }
  devise_for :user, skip: [:session, :password, :registration, :confirmation]
  as :user do
    get    'login' => 'devise/sessions#new', as: :new_user_session
    post   'login' => 'devise/sessions#create', as: :user_session
    delete 'logout' => 'devise/sessions#destroy', as: :destroy_user_session

    post   'forgot' => 'devise/passwords#create', as: :user_password
    get    'forgot' => 'devise/passwords#new', as: :new_user_password
    get    'forgot/edit' => 'devise/passwords#edit', as: :edit_user_password
    match  'forgot' => 'devise/passwords#update', via: [:patch, :put], as: nil

    get    'cancel' => 'devise/registrations#cancel', as: :cancel_user_registration
    post   'user' => 'devise/registrations#create', as: :user_registration
    get    'register' => 'devise/registrations#new', as: :new_user_registration
    get    'user' => 'devise/registrations#edit', as: :edit_user_registration
    match  'user' => 'devise/registrations#update', via: [:patch, :put], as: nil
    # delete 'user' => 'devise/registrations#destroy'

    post   'confirmation' => 'devise/confirmations#create', as: :user_confirmation
    get    'confirmation/new' => 'devise/confirmations#new', as: :new_user_confirmation
    get    'confirmation' => 'devise/confirmations#show'
  end

  get 'dashboard' => 'dashboard#index'
end
