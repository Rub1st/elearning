require 'rails_helper'
require 'json'

RSpec.describe CertificatesController, type: :controller do
  before do
    sign_in current_user
  end

  describe '#index' do
    let(:current_user) do
      User.create(
        email: 'dion.ruby@gmail.com',
        password: '123456',
        login: 'Akira',
        full_name: 'Denis Rubis',
        confirmed_at: Time.now.utc
      )
    end

    context "when user doesn't have certificates" do
      let(:parsed_response) { JSON.parse(response.body) }
      it do
        get :index
        expect(parsed_response).to eq([])
      end
    end

    context 'when user has certificates' do
      let(:course) { Course.create(label: 'Ruby', why_content: '-', will_content: '-', author: current_user) }
      let!(:certificates) { Certificate.create(user_id: current_user.id, course_id: course.id) }
      let(:parsed_response) { JSON.parse(response.body) }
      it do
        get :index
        expect(parsed_response.length).to eq(1)
      end
      it do
        get :index
        expect(parsed_response[0]['user_id']).to eq(current_user.id)
      end
    end
  end
end
