# frozen_string_literal: true

# app/models/user.rb

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true, length: { maximum: 50 }
  validates :phone_number, format: { with: /\A(?:\+81|0)\d{9,10}\z/, message: 'は日本の携帯電話番号の形式で入力してください' },
                           allow_blank: true
  validates :email, uniqueness: true,
                    format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'は有効なメールアドレスの形式で入力してください' }
  validate :validate_birthdate
  validates :password, length: { minimum: 8 },
                       format: { with: /\A(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+\z/, message: 'は英数字の組み合わせで8文字以上で入力してください' }
  validates :beebits_name, presence: true, uniqueness: { case_sensitive: true, on: :create },
                           format: { with: /\A@[\w]+\z/, message: 'は@で始まり、英数字とアンダーバー(_)のみが使用できます' },
                           length: { maximum: 15 }

  private

  def validate_birthdate
    if birthdate.blank?
      errors.add(:birthdate, 'を入力してください')
    elsif birthdate > 15.years.ago.to_date
      errors.add(:birthdate, 'が15歳未満の方はご利用いただけません')
    end
  end
end
