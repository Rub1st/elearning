module Users
  class Impersonate
    include Service

    def initialize(params, current_user)
      @params = params
      @current_user = current_user
    end

    def call
      create_impersonation_in_db
      impersonation_user
    end

    private

    def impersonation_user
      @user = User.find(@params[:id])
    end

    def create_impersonation_in_db
      Impersonation.create(manager_id: @current_user[:id],
                           common_id: @params[:id],
                           start: Time.now.utc,
                           end: Time.now.utc,
                           organization_id: @params[:org_id])
    end
  end
end
