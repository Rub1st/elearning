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

  post 'impersonations/create'
  put 'impersonations/update'
  delete 'impersonations/destroy'
  get 'impersonations/index'
  get 'impersonations/show'

  post 'courses/create'
  put 'courses/update'
  delete 'courses/destroy'
  get 'courses/index'
  get 'courses/show'

  post 'pages/create'
  put 'pages/update'
  delete 'pages/destroy'
  get 'pages/index'
  get 'pages/show'

  post 'questions/create'
  put 'questions/update'
  delete 'questions/destroy'
  get 'questions/index'
  get 'questions/show'

  post 'variants/create'
  put 'variants/update'
  delete 'variants/destroy'
  get 'variants/index'
  get 'variants/show'

  post 'answers/create'
  put 'answers/update'
  delete 'answers/destroy'
  get 'answers/index'
  get 'answers/show'

  post 'comments/create'
  put 'comments/update'
  delete 'comments/destroy'
  get 'comments/index'
  get 'comments/show'

  post 'replies/create'
  put 'replies/update'
  delete 'replies/destroy'
  get 'replies/index'
  get 'replies/show'

  post 'course_tags/create'
  put 'course_tags/update'
  delete 'course_tags/destroy'
  get 'course_tags/index'
  get 'course_tags/show'

  post 'certificates/create'
  put 'certificates/update'
  delete 'certificates/destroy'
  get 'certificates/index'
  get 'certificates/show'

  post 'user_courses/create'
  put 'user_courses/update'
  delete 'user_courses/destroy'
  get 'user_courses/index'
  get 'user_courses/show'

  post 'user_answers/create'
  put 'user_answers/update'
  delete 'user_answers/destroy'
  get 'user_answers/index'
  get 'user_answers/show'

  resources :users,
            :organizations,
            :registered_members,
            :unregistered_members,
            :tags,
            :impersonations,
            :courses,
            :pages,
            :questions,
            :variants,
            :answers,
            :comments,
            :replies,
            :course_tags,
            :certificates,
            :user_courses,
            :user_answers

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
