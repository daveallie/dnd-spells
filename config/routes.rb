Rails.application.routes.draw do
  root 'home#spells'
  get  'spells' => 'home#spells'
  get  'spells/:spell_code' => 'home#spells_code', as: 'spell_code'
  post 'spells' => 'home#update_spells'
  get  'dice'=> 'home#dice'

  devise_for :user, :path => '', :path_names => {
                      :sign_in => 'login', :sign_out => 'logout',
                      :sign_up => 'register', :password => 'forgot'}
end
