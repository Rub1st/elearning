module Organizations
  class Create
    include Service

    def initialize(params, current_user)
      @params = params
      @current_user = current_user
    end

    def call
      @new_organization = create_new_organization

      attach_certificate_template

      if @new_organization.save
        create_main_manager
        { json: @new_organization }
      else
        { json: { errors: @new_organization.errors }, status: :unprocessable_entity }
      end
    end

    private

    def attach_certificate_template
      if @params[:certificate_template].present?
        @new_organization.certificate_template.attach(@params[:certificate_template])
      else
        @new_organization.certificate_template.attach(
          io: File.open(Rails.root.join('app/assets/images/certificate_template_1.pdf')),
          filename: 'certificate.pdf'
        )
      end
    end

    def choose_appove_status
      @params[:approve_status].nil? ? 0 : @params[:approve_status]
    end

    def create_main_manager
      RegisteredMember.create(user_id: @current_user[:id], organization_id: @new_organization[:id], member_role: 0)
    end

    def create_new_organization
      Organization.new(
        name: @params[:name],
        description: @params[:description],
        approve_status: choose_appove_status
      )
    end
  end
end
