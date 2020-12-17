module UnregisteredMembers
  class Create
    include Service

    def initialize(params)
      @params = params
    end

    def call
      create_new_member
    end

    private

    def generate_code
      rand(10_000_000..99_999_999)
    end

    def create_new_member
      UnregisteredMember.new(
        organization_id: @params[:organization_id],
        member_role: @params[:member_role],
        email: @params[:email],
        code: generate_code
      )
    end
  end
end
