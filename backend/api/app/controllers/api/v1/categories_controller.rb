module Api
  module V1
    class CategoriesController < ApplicationController
      def index
          categories = Category.all.order(:id)
          render json: categories, each_serializer: CategorySerializer
      end

      def create
        category = Category.new(category_params)
        if category.save
          render json: { status: 'SUCCESS', data: category }
        else
          render json: { status: 'ERROR', data: category.errors }
        end
      end

      def show
        category = Category.where(id: params[:id])
        render json: category, each_serializer: CategoryWithCommentsSerializer, include: [:comments]
      end

      def statistics
        comment_counts = Comment.group(:category_id).select("category_id, count(1) as commentCount")
        categories = Category.joins("LEFT JOIN (#{comment_counts.to_sql}) comment_data ON id = comment_data.category_id")
        result = categories.select("id, name, COALESCE(commentCount, 0) as commentCount").order(:id)

        render json: {status: 'SUCCESS', data: result}
      end

      def update
        category = Category.find(params[:id])
        category.update!(name: category_params["name"])
        
        render json: {status: 'SUCCESS', data: "更新完了"}
      end

      def destroy
        category = Category.find(params[:id])
        category.destroy!
        
        render json: {status: 'SUCCESS', data: "削除完了"}
      end
    
      private
    
      def category_params
        params.permit(:name)
      end

    end
  end
end