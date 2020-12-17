module Admin
  class UsersController < ApplicationController
    def index
      render json: User.all
    end

    def update
      user = User.find(params[:id])

      if user.update(permit_params)
        render json: User.all
      else
        render json: { errors: user.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      User.find(params[:id]).destroy
      render json: User.all
    end

    def search
      search = params[:term] != '' ? params[:term] : nil
      if search
        render json: User.search(search)
      else
        render json: User.all
      end
    end

    private

    def permit_params
      params.require(:user).permit(
        :user_status
      )
    end
  end
end