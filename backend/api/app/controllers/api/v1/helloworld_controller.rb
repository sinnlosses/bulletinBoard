module Api
    module V1
        class HelloworldController < ApplicationController
            def index
                msg = "Hello World"
                render status: 200, json: { msg: msg }
            end
        end
    end
end
