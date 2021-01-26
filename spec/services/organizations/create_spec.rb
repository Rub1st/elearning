require 'rails_helper'

RSpec.describe Organizations::Create, type: :service do
  describe '#call' do
    subject(:organization) { described_class.call(params, user)[:json] }
    let(:user) { User.new(email: 'dion.ruby@gmail.com', password: '123456', login: 'Akira', full_name: 'Denis Rubis') }

    context 'when organization created' do
      context 'with default approve_status' do
        let(:params) { { name: 'DD', description: 'Music' } }
        it { expect(organization.approve_status).to eq('pending') }
      end
      context 'with rejected approve_status' do
        let(:params) { { name: 'DD', description: 'Music', approve_status: 1 } }
        it { expect(organization.approve_status).to eq('rejected') }
      end
      context 'with approved approve_status' do
        let(:params) { { name: 'DD', description: 'Music', approve_status: 2 } }
        it { expect(organization.approve_status).to eq('approved') }
      end
      context 'with pending approve_status' do
        let(:params) { { name: 'DD', description: 'Music', approve_status: 0 } }
        it { expect(organization.approve_status).to eq('pending') }
      end
    end
  end
end
