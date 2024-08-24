# ベースイメージ
FROM ruby:3.2.2-alpine3.18

# 必要なパッケージをインストール
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        build-base \
        linux-headers \
        libxml2-dev \
        curl-dev \
        mysql-client \
        mysql-dev \
        nodejs \
        npm \
        tzdata \
        bash \
        chromium \
        chromium-chromedriver \
        graphviz

# 作業ディレクトリを設定
WORKDIR /app

# Bundlerのインストール
RUN gem install bundler

# バックエンドの依存関係をインストール
COPY Gemfile Gemfile.lock ./
RUN bundle install

# フロントエンドの依存関係をインストール
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# アプリケーションのソースコードをコピー
WORKDIR /app
COPY . .

# ポートを公開
EXPOSE 3000 5173

# エントリポイントスクリプトをコピーして実行権限を付与
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# エントリポイントを設定
ENTRYPOINT ["entrypoint.sh"]

# デフォルトのコマンドを設定
CMD ["sh", "-c", "cd frontend && npm run dev -- --host 0.0.0.0 & rails server -b 0.0.0.0"]
