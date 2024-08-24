FROM ruby:3.2.2-alpine3.18

# 依存関係のインストール
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        linux-headers \
        libxml2-dev \
        make \
        gcc \
        libc-dev \
        nodejs \
        npm \
        tzdata \
        bash \
        mysql-dev \
        chromium \
        chromium-chromedriver \
        graphviz && \
    apk add --no-cache -t .build-packages \
        build-base \
        curl-dev \
        mysql-client

# 作業ディレクトリの設定
WORKDIR /app

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Bundlerと依存関係のインストール
RUN gem install bundler && \
    bundle install

# アプリケーション全体のソースコードをコピー
WORKDIR /app
COPY . .

# ポートを公開
EXPOSE 3000

# エントリポイントスクリプトをコピー
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# エントリポイントとデフォルトコマンドの設定
ENTRYPOINT ["entrypoint.sh"]

# フロントエンドの開発サーバーとRailsサーバーを同時に起動
CMD ["sh", "-c", "cd frontend && npm run dev & rails server -b 0.0.0.0"]
