Rails.application.routes.draw do

  resources :users, only: %i[create update destroy index show]                #+
  resources :organizations, only: %i[create update destroy index show]        #+
  resources :registered_members, only: %i[create update destroy index show]   #+
  resources :unregistered_members, only: %i[create update destroy index show] #+
  resources :tags, only: %i[create index show]                                #+
  resources :impersonations, only: %i[create index show]                      #+
  resources :courses, only: %i[create update destroy index show]
  resources :pages, only: %i[create update destroy index show]                #+
  resources :questions, only: %i[create destroy index show]                   #+
  resources :variants, only: %i[create destroy index show]                    #+
  resources :answers, only: %i[create update destroy index show]              #+
  resources :comments, only: %i[create index]
  resources :replies, only: %i[create index]
  resources :course_tags, only: %i[create index destroy]                      #+
  resources :certificates, only: %i[create index show]
  resources :user_courses, only: %i[create update index show]                 #+
  resources :user_answers, only: %i[create update index show]                 #+
  resources :reports, only: %i[create index show]                             #+
  resources :theories, only: %i[create destroy index show]                    #+

  # devise_for :users, controllers: { create: 'create',
  #                                   update: 'update',
  #                                   destroy: 'destroy',
  #                                   index: 'index',
  #                                   show: 'show' }
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
