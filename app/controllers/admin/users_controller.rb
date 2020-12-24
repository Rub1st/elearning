module Admin
  class UsersController < ApplicationController
    def index
      render json: User.all
    end

    def update
      user = User.find(params[:id])

      render_updated_data(user, permit_params, User)
    end

    def destroy
      User.find(params[:id]).destroy
      render json: User.all
    end

    def search
      render_search_data User
    end

    private

    def permit_params
      params.require(:user).permit(
        :user_status
      )
    end
  end
end