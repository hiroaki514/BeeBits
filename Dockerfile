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

# ルート直下のpackage.jsonを使用して依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# エントリポイントスクリプトをコピー
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# ポートを公開
EXPOSE 3000
EXPOSE 5173

# エントリポイントとデフォルトコマンドの設定
ENTRYPOINT ["entrypoint.sh"]
CMD ["rails", "server", "-b", "0.0.0.0"]
