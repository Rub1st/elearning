module Admin
  class ImpersonationsController < ApplicationController
    def index
      render json: Impersonation.all
    end

    def search
      search = params[:term] != '' ? params[:term] : nil
      if search
        render json: Impersonation.search(search)
      else
        render json: Impersonation.all
      end
    end
  end
end
