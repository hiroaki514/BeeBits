namespace :test do
  desc "Helloを出力するバッチ処理"
  task say_hello: :environment do
    puts "Hello"
  end
end
