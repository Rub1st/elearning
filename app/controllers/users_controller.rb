# class UsersController < ApplicationController

#   def create
#     user = User.new(permit_params)
#     user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: 'file.jpg')
#     user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: 'file.pdf')
#     if user.save
#       render json: User.all
#     else
#       render json: { errors: user.errors }, status: :unprocessable_entity
#     end
#   end

#   def update
#     user = User.find(params[:id])

#     if user.update(permit_params)
#       render json: user
#     else
#       render json: { errors: user.errors }, status: :unprocessable_entity
#     end
#   end

#   def destroy
#     User.find(params[:id]).destroy
#     render json: User.all
#   end

#   def index
#     render json: User.all
#   end

#   def show
#     render json: User.find(params[:id])
#   end

#   private

#   def permit_params
#     params.require(:user).permit(
#       :login,
#       :email,
#       :full_name,
#       :birthday,
#       :user_role,
#       :password,
#       :avatar,
#       :certificate_template,
#       :decrypted_password,
#       :user_status
#     )
#   end
# end
class UsersController < ApplicationController

  before_action :find_user, only: %w[show]

  def show
    render_jsonapi_response(@user)
  end

  def current_user
    render_jsonapi_response(current_user)
  end

  private

  def find_user
    @user = User.find(params[:id])
  end
end
