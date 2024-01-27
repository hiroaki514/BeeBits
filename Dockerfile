FROM ruby:3.2.2-alpine3.18

# 必要なパッケージのインストール
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
      chromium-chromedriver && \
    rm -rf /var/cache/apk/*

# 必要なGemのインストール
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN apk add --no-cache -t .build-packages build-base curl-dev mysql-client && \
    gem install bundler && \
    bundle install && \
    apk del --purge .build-packages

# Node.jsとYarnのインストール
RUN npm install -g yarn

# プロジェクトファイルのコピーと初期設定
COPY . /app

# entrypoint.shの設定
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
