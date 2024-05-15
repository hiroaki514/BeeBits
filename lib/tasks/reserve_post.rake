namespace :reserve_post do
  desc 'Save reserved posts to reserve_post_timelines table'
  task save_posts: :environment do
    ReservePostTimelines.all.each do |post|
      ReservePostTimeline.create(content: post.content)
    end
    puts 'Reserved posts saved to reserve_post_timelines table.'
  end
end
