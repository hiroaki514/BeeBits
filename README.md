# アノテーションコメント
```
$ docker compose run web rails notes (--annotations TODO)
```

# seed_fuの実行
```
$ docker compose run web rails db:seed_fu
```

# rubocopの実行
```
$ docker compose run web rubocop -A
```

# 強制プッシュ時の方法
```
$ git push --force-with-lease origin ブランチ名
```


# テストについて
```
テストツール
・Rspec(コードのテスト自動化 ※単体テスト)
 →MVCそれぞれコードベースのテストが書けるものだが、実際はモデルかコントローラのAPI(RequestSpec)のみテストする

・Capybara(手動テストの自動化 ※統合テスト)
 →ビューをテストする、Rspecとは別のgemを導入する必要がある
 →seleniumが含まれる(Rspecと同じ記述方法で使える)

 テストの記述
 ・テストは正常系と異常系の2パターンを書く
```


# deviseコマンドについて
```
・deviseのユーザモデル作成(初期設定)
$rails g devise user

・deviseのView作成
$rails g devise:views users

・deviseのcontroller作成
$rails g devise:controllers users

・deviseのルーティング設定
例:
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions     : 'users/sessions'
  }

```

# flashの記述
```
flash[:notice]: ユーザーに表示する通知メッセージを設定するキー。緑色の背景色が一般的です。
flash[:alert]: ユーザーに表示するエラーメッセージを設定するキー。赤い背景色が一般的です。
flash[:warning]: ユーザーに表示する警告メッセージを設定するキー。黄色の背景色が一般的です。
flash[:success]: ユーザーに表示する成功メッセージを設定するキー。緑色の背景色が一般的です。
```

# 部分テンプレート
```
パスの指定はview以下を指定する
例："layouts/side_bar"
```

# Railsのメソッド
```
current_page?(URL)でページの判別ができる
```

# ActiveStrorageeの単数枚画像のアップロード方法
```
1. ActiveStorageのインストール
  - $rails g active_storage:install
2. ActiveStorageのテーブル作成
  - $ rails db:migrate
3. has_one_atacchedの記述を紐付けたいモデルに記述
4. ビューにfile_fieledを追記する(ファイル投稿用のボタン)
5. コントローラでパラメータの記述を加える
```

# 検索用メソッドの違い
```
1.find
 - id検索のみで一件取得
2.find_by
 - id以外で一件取得
3.where
 - 合致したもの全てを取得
```

# コンテナのクリーンアップ
```
% docker stop $(docker ps -q)
% docker rm $(docker ps -aq)
% docker rmi $(docker images -q)
```

# アソシエーション
```
・アソシエーションはモデル間の紐づけ
・一対多
  has_many :posts (複数形)
  belongs_to :user
・一対一
  has_one :post (単数形)
  belongs_to :user
・dependentオプション
  :destroy (削除)
  :delete_all (削除)
  :nullify (削除しない)
  :restrict_with_error (エラーを返す)
```

# アソシエーションのデータ作成とデータ取得
```
  作成(一対多の場合)
  user.posts.create(body: "テスト")
    作成(一対一の場合)
  user.post.create(body: "テスト")

  取得(一対多の場合)
  user.posts
    取得(一対一の場合)
  user.post
```

# ルーティングの設定
```
7つのアクションを全て定義する
 resources :organization

resourcesで作られるアクションの制限
  resources :organization, only: %i[new create]
  resources :organization, except: %i[index show edit update destroy]
```

# モデル名とコントローラー名
```
モデル名: Organization
テーブル名: organizations
コントローラー名: organizations_controller
```

# ローカル変数とインスタンス変数
```
ローカル変数: user
　→同一ファイル内でしか使えない変数

インスタンス変数: @user
　→同一ファイル外でも使える変数
(クラス変数: @@user  ※基本使わない)
```

# バリデーションの表示方法
```
1. モデルにバリデーションを定義
　→例:validates :name, presence: true
2. ビューファイルにエラーメッセージを表示する記述を追加
 →例:  <% if @organization.errors.any? %>
      <div style="color: red">
        <h2>エラーがあります</h2>
        <ul>
          <% @organization.errors.each do |error| %>
            <li><%= error.full_message %></li>
          <% end %>
        </ul>
    </div>
  <% end %>
3. コントローラでvalid?、invalid?、saveメソッドを実行してバリデーションを判定
 →    if @organization.valid?
      @organization.save
```

# 論理削除(SoftDelete)と物理削除(Physical_Delete)
```
「論理削除」
 ・データそのものはDBに残る
 ・論理削除の判定フラグがONになる
 例：discarded_atが削除された判定フラグ
「物理削除」
 ・データそのものを削除、DBには残らない
 ・destroyメソッドを使用する(def destroyのようなアクションではない)

「default_scope」※organizationモデルに定義している
 ・モデルに常に適応する条件の記述

```

# テンプレート
```
$
```
