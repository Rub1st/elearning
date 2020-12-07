Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3030'
    resource '*', headers: :any,
     :expose => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
     methods: :any, credentials: true
  end
end

 # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins 'http://your.frontend.domain.com'
    #     resource '/api/*',
    #       headers: %w(Authorization),
    #       methods: :any,
    #       expose: %w(Authorization),
    #       max_age: 600
    #   end
    # end