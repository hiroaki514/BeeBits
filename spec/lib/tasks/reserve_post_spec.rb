# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'reserve_post:save_posts' do
  # let(:user) { create(:user) }
  # let(:task) { Rake::Task['reserve_post:save_posts'].invoke }

  # before do
  #   create(:reserve_post_timeline, user:, content: '予約投稿1')
  #   create(:reserve_post_timeline, user:, content: '予約投稿2')
  #   create(:reserve_post_timeline, user:, content: '予約投稿3')
  # end

  # it '予約投稿テーブルから投稿テーブルにデータがコピーされること' do
  #   expect { task }
  #     .to change { Timeline.count }.by(3)
  #     .and change { ReservePostTimeline.count }.from(3).to(0)

  #   timelines = Timeline.all
  #   expect(timelines[0].content).to eq('予約投稿1')
  #   expect(timelines[1].content).to eq('予約投稿2')
  #   expect(timelines[2].content).to eq('予約投稿3')
  # end
end
