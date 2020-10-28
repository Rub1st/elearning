Rails.application.routes.draw do

  post 'users/create'
  put 'users/update'
  delete 'users/destroy'
  get 'users/index'
  get 'users/show'

  post 'organizations/create'
  put 'organizations/update'
  delete 'organizations/destroy'
  get 'organizations/index'
  get 'organizations/show'

  resources :users, :organizations

  devise_for :users
  # devise_for :users, path: 'auth',
  #                    path_names: { sign_in: 'login',
  #                                  sign_out: 'logout',
  #                                  password: 'secret',
  #                                  confirmation: 'verification',
  #                                  unlock: 'unblock',
  #                                  registration: 'register',
  #                                  sign_up: 'cmon_let_me_in' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
