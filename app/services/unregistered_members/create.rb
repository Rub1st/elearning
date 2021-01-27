module UnregisteredMembers
  class Create
    include Service

    attr_accessor :params

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

    def choice_member_role
      params[:member_role].nil? ? 1 : params[:member_role]
    end

    def create_new_member
      UnregisteredMember.new(
        organization_id: params[:organization_id],
        member_role: choice_member_role,
        email: params[:email],
        code: generate_code
      )
    end
  end
end
