FROM ruby:3.2.2-alpine3.18

WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN apk update && \
    apk upgrade && \
    apk add --no-cache linux-headers libxml2-dev make gcc libc-dev nodejs tzdata bash mysql-dev chromium chromium-chromedriver && \
    apk add --no-cache -t .build-packages build-base curl-dev mysql-client && \
    gem install bundler && \
    bundle install && \
    apk del --purge .build-packages

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
