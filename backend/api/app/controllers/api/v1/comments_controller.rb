module Api
  module V1
    class CommentsController < ApplicationController
        def index
            comments = Comment.all
            render json: comments, each_serializer: CommentSerializer, include: [:categories]
          end
        
        def create
          comment = Comment.new(comment_params)
          if comment.save
            render json: { status: 'SUCCESS', data: comment }
          else
            render json: { status: 'ERROR', data: comment.errors }
          end
        end
      
        private
      
        def comment_params
          params.require(:comment).permit(:name, :mailaddress, :subject, :body, :category_id)
        end
    end
  end
end