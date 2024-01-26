# db/fixtures/01_users.rb

def generate_unique_mobile_number
  loop do
    prefixes = %w[080 090 070]
    phone_number = "#{prefixes.sample}#{rand(10**7).to_s.rjust(7, '0')}"
    return phone_number unless User.exists?(phone_number: phone_number)
  end
end

30.times do |n|
  User.seed do |s|
    s.name = "テスト太郎#{n + 1}"
    s.phone_number = (n < 3) ? "0901234567#{n}" : generate_unique_mobile_number
    s.email = "testuser#{n + 1}@example.com"
    s.birthdate = (n < 15) ? (Time.current - rand(15..25).years).to_date : (Time.current - rand(0..14).years).to_date
    s.password = 'password123'

    # beebits_nameの生成
    beebits_name_length = rand(1..15)
    beebits_name = "@"
    beebits_name.insert(rand(beebits_name.length + 1), '_') if n < 5  # アンダーバーの挿入

    s.beebits_name = beebits_name + rand(1..100).to_s
  end
end

# テスト太郎0の個別の記述
User.seed do |s|
  s.name = "テスト太郎0"
  s.phone_number = "09098765432"
  s.email = "testuser0@example.com"
  s.birthdate = Time.current - rand(15..25).years
  s.password = 'password123'

  # beebits_nameの生成
  beebits_name_length = rand(1..15)
  s.beebits_name = "@"
  s.beebits_name.insert(rand(beebits_name.length + 1), '_')
  s.beebits_name += rand(1..100).to_s
end
