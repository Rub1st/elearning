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

  post 'registered_members/create'
  put 'registered_members/update'
  delete 'registered_members/destroy'
  get 'registered_members/index'
  get 'registered_members/show'

  post 'unregistered_members/create'
  put 'unregistered_members/update'
  delete 'unregistered_members/destroy'
  get 'unregistered_members/index'
  get 'unregistered_members/show'

  post 'tags/create'
  put 'tags/update'
  delete 'tags/destroy'
  get 'tags/index'
  get 'tags/show'

  resources :users,
            :organizations,
            :registered_members,
            :unregistered_members,
            :tags

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
