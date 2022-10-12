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
    
      private
    
      def category_params
        params.require(:category).permit(:name)
      end

    end
  end
end