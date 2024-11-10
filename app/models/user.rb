# frozen_string_literal: true

class User < ApplicationRecord

  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  validates_with NameValidator

  validates_with PhoneNumberValidator

  validates_with EmailValidator

  validates_with BirthdateValidator

  validates_with PasswordValidator

  validates_with BeebitsNameValidator

  validates_with BioValidator

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


end
