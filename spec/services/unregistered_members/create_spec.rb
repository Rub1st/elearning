require 'rails_helper'

RSpec.describe UnregisteredMembers::Create, type: :service do
  describe '#call' do
    subject(:unregistered_member) { described_class.call(params) }
    let(:organization) { Organization.create(name: 'Gucci', description: 'Luxary store') }
    let(:email) { 'denis.rubis@mail.com' }

    context 'when unregistered member created' do
      context 'with default member_role' do
        let(:params) { { organization_id: organization.id, email: email } }
        it { expect(unregistered_member.member_role).to eq('common') }
      end
      context 'with manager member_role' do
        let(:params) { { organization_id: organization.id, email: email, member_role: 0 } }
        it { expect(unregistered_member.member_role).to eq('manager') }
      end
      context 'with common member_role' do
        let(:params) { { organization_id: organization.id, email: email, member_role: 1 } }
        it { expect(unregistered_member.member_role).to eq('common') }
      end
    end
  end
end
