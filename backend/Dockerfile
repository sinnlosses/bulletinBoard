FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /api
WORKDIR /api
ADD ./api/Gemfile /api/Gemfile
ADD ./api/Gemfile.lock /api/Gemfile.lock
RUN bundle install