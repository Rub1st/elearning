class UsersController < ApplicationController
  def index
    authorize!

    render json: users
  end

  # rubocop:disable Metrics/AbcSize
  def update
    user = User.find(params[:id])

    authorize! user

    if user_params[:avatar].present?
      user.avatar.purge
      user.avatar.attach(user_params[:avatar])
    end

    if user_params[:certificate_template].present?
      user.certificate_template.purge
      user.certificate_template.attach(user_params[:certificate_template])
    end

    updated = { login: user_params[:login], full_name: user_params[:full_name] }

    render_updated_data(user, updated, users)
  end
  # rubocop:enable Metrics/AbcSize

  def search
    render_search_data users
  end

  def impersonate
    user = Users::Impersonate.call(params, current_user)

    impersonate_user(user)

    redirect_to root_path
  end

  def stop_impersonating
    impersonation = Impersonation.where(common_id: current_user[:id]).last
    impersonation.update(end: Time.now.utc)
    stop_impersonating_user
    redirect_to root_path
  end

  def connect_organizations
    email = current_user[:email]

    unregistered_members = UnregisteredMember.where(email: email)

    unregistered_members.each do |item|
      RegisteredMember.create(user: current_user,
                              organization: item.organization,
                              member_role: item.member_role)
    end

    unregistered_members.destroy_all

    render json: Organization.all
  end

  private

  def users
    @users ||= User.where(user_role: 1)
  end

  def user_params
    params.require(:user).permit(
      :certificate_template,
      :avatar,
      :full_name,
      :login,
      :organization_id
    )
  end
end
