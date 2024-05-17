FROM ruby:3.2.2-alpine3.18

# Install dependencies
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
    apk add --no-cache -t .build-packages \
        build-base \
        curl-dev \
        mysql-client

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Bundler and dependencies
RUN gem install bundler && \
    bundle install

# Copy entrypoint script
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Expose port
EXPOSE 3000

# Set entrypoint and default command
ENTRYPOINT ["entrypoint.sh"]
CMD ["rails", "server", "-b", "0.0.0.0"]
