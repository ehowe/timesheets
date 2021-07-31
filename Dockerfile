FROM ruby:2.5.0-slim

LABEL maintainer="zedtux@zedroot.org"

ENV DEBIAN_FRONTEND noninteractive

# ~~~~ System locales ~~~~
RUN apt-get update && apt-get install -y locales && \
  dpkg-reconfigure locales && \
  locale-gen C.UTF-8 && \
  /usr/sbin/update-locale LANG=C.UTF-8 && \
  echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && \
  locale-gen

# Set default locale for the environment
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV APP_HOME /application

# ~~~~ User and folders ~~~~
RUN useradd -ms /bin/bash rails5-react && \
  mkdir $APP_HOME && \
  chown -R rails5-react:rails5-react $APP_HOME

RUN apt-get update -qq && \
    apt-get install -y build-essential curl libsqlite3-dev

# ~~~~ Node.js ~~~~
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# ~~~~ Yarn ~~~~
ENV YARN_VERSION 1.7.0
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo deb https://dl.yarnpkg.com/debian/ stable main | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && \
    apt-get install -y yarn

# ~~~~ Bundler ~~~~
RUN gem install bundler && \
    gem install rubygems-update --no-ri --no-rdoc --version 2.7.0 && \
    update_rubygems

# ~~~~ Install Rails application gems ~~~~
ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
    BUNDLE_JOBS=8

WORKDIR $APP_HOME
COPY --chown=rails5-react:rails5-react Gemfile* $APP_HOME/

RUN bundle install

# ~~~~ Install JavaScript packages ~~~~
COPY --chown=rails5-react:rails5-react package.json $APP_HOME
COPY --chown=rails5-react:rails5-react yarn.lock $APP_HOME
RUN yarn install && \
    yarn cache clean

# ~~~~ Import application ~~~~
COPY --chown=rails5-react:rails5-react . $APP_HOME

USER rails5-react
