module Api
  module V1
    class CommentsController < ApplicationController
        before_action :authenticate_api_v1_user!, except: [:index,:create, :show_or_hide]
        
        def index
            comments = Comment.where(is_shown: true)
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

        def show_or_hide
          is_shown = comment_params[:is_shown]
          comment = Comment.find(params[:id])
          comment.update!(is_shown: is_shown)

          render json: {status: 'SUCCESS', data: "更新完了"}
        end
      
        private
      
        def comment_params
          params.permit(:name, :mailaddress, :subject, :body, :category_id, :poster_id, :is_shown)
        end
    end
  end
end