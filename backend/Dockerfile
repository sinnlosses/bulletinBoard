FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /backend
WORKDIR /backend
ADD Gemfile /backend/Gemfile
ADD Gemfile.lock /backend/Gemfile.lock
RUN bundle install