class HelloworldController < ApplicationController
    def index
        users = "Hello World"
        render status: 200, json: { users: users }
    end
end
