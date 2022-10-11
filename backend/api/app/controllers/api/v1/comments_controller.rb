module Api
  module V1
    class CommentsController < ApplicationController
        def index
            comments = Comments.all
            render json: comments, each_serializer: CommentsSerializer, include: [:categories]
          end
        
          def create
            comment = Category.new(comment_params)
            if comment.save
              render json: { status: 'SUCCESS', data: comment }
            else
              render json: { status: 'ERROR', data: comment.errors }
            end
          end
        
          private
        
          def comment_params
            params.require(:comment).permit(:name)
          end
    end
  end
end