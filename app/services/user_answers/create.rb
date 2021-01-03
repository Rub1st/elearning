module UserAnswers
  class Create
    include Service

    def initialize(params)
      @params = params
    end

    def call
      destroy_old_answers
      create_new_user_answer
    end

    private

    def destroy_old_answers
      UserAnswer.where(user_id: @params[:user_id], question_id: @params[:question_id]).destroy_all
    end

    def create_new_user_answer
      UserAnswer.new(@params)
    end
  end
end
