Rails.application.routes.draw do
  root 'home#spells'
  get  'spells' => 'home#spells'
  get  'spells/:spell_code' => 'home#spells_code', as: 'spell_code'
  post 'spells' => 'home#update_spells'
  get  'dice'=> 'home#dice'

  devise_for :users, :skip => [:sessions, :registration]
  as :user do
    get    'register/cancel' => 'devise/registrations#cancel', :as => :cancel_user_registration
    post   'register' => 'devise/registrations#create', :as => :user_registration
    get    'register' => 'devise/registrations#new', :as => :new_user_registration
    get    'users/edit' => 'devise/registrations#edit', :as => :edit_user_registration
    patch  'users' => 'devise/registrations#update'
    put    'users' => 'devise/registrations#update'
    delete 'users' => 'devise/registrations#destroy'
    get    'login' => 'devise/sessions#new', :as => :new_user_session
    post   'login' => 'devise/sessions#create', :as => :user_session
    delete 'logout' => 'devise/sessions#destroy', :as => :destroy_user_session
  end
end
