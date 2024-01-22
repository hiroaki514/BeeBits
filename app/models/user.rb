# app/models/user.rb

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

=begin
  validates :name, presence: true, length: { maximum: 50 }
  validates :phone_number, format: { with: /\A(?:\+81|0)\d{9,10}\z/, message: "は日本の携帯電話番号の形式で入力してください" }, allow_blank: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "は有効なメールアドレスの形式で入力してください" }
  validate :validate_birthdate
  validates :password, presence: true, length: { minimum: 8 }, format: { with: /\A(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+\z/, message: "は英数字の組み合わせで8文字以上で入力してください" }
  validates :BeeBits_id, presence: true, uniqueness: true, 
                         format: { with: /\A@[\w]+\z/, message: "は@で始まり、英数字とアンダーバー(_)のみが使用できます" },
                         length: { maximum: 15 }
=end

  private

  def validate_birthdate
    if birthdate.present? && birthdate > 15.years.ago
      errors.add(:base, "15歳未満は登録できません")
    end
  end
end
