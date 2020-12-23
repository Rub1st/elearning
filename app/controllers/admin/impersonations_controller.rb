module Admin
  class ImpersonationsController < ApplicationController
    def index
      authorize!
      render json: Impersonation.all
    end

    def search
      render_search_data Impersonation
    end
  end
end
