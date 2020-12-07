# module Service
#   def self.call(...)
#     new(...).call
#   end
# end

module Service
  extend ActiveSupport::Concern

  included do
    def self.call(*args, &block)
      new(*args).call(&block)
    end
  end
end