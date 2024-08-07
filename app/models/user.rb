# frozen_string_literal: true

class User < ApplicationRecord
  attr_accessor :skip_password_validation

  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  validates :name, presence: true, length: { minimum: 2, maximum: 50 }

  validates :phone_number, format: {
                             with: /\A(?:\+81|0(?:70|80|90))\d{8,9}\z/,
                             message: 'は日本の携帯電話番号の形式で入力してください'
                           },
                           allow_blank: true

  validates :email, uniqueness: true,
                    format: { with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\z/,
                              message: 'は有効な形式で入力してください' },
                    length: { maximum: 254 }

  validates :birthdate, presence: true

  validates :password, length: { minimum: 8, maximum: 128 },
                       format: { with: /\A(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+\z/,
                                 message: 'は英数字の組み合わせで8文字以上で入力してください' },
                       allow_nil: true, unless: -> { skip_password_validation }

  validates :beebits_name, presence: true,
                           uniqueness: { case_sensitive: false, on: :create },
                           format: { with: /\A@[\w]+\z/,
                                     message: 'は英数字とアンダーバー(_)のみが使用できます' },
                           length: { maximum: 15 }
  validates :bio, length: { maximum: 160 } # 自己紹介(bio)のバリデーション

  validate :validate_birthdate
  validate :birthdate_validity

  has_many :timelines, dependent: :destroy
  has_many :reserve_post_timelines, dependent: :destroy
  has_many :favorites, dependent: :destroy

  # deviseのデフォルト設定によるデータベース保存時のdowncase挙動を上書きで停止
  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions).where(['lower(beebits_name) = :value', { value: login.downcase }]).first
    else
      where(['lower(beebits_name) = :value', { value: conditions[:beebits_name].downcase }]).first
    end
  end

  # favoritesテーブルにtimeline_idが存在しているかを検索
  def favorited_by?(timeline_id)
    favorites.exists?(timeline_id:)
  end

  private

  def validate_birthdate
    errors.add(:birthdate, 'が15歳未満の方はご利用いただけません') if birthdate && birthdate > 15.years.ago.to_date
  end

  def birthdate_validity
    return unless birthdate.blank? || birthdate > Date.current || birthdate < 150.years.ago.to_date

    errors.add(:birthdate, 'の入力が正しくありません')
  end

  def unique_username_case_insensitive
    existing_user = User.where('lower(beebits_name) = ?', beebits_name.downcase).where.not(id:).first
    errors.add(:beebits_name, 'はすでに存在します') if existing_user
  end
end
