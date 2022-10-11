module Api
  module V1
    class CategoriesController < ApplicationController
      def index
          categories = Category.all.order(:id)
          render json: categories, each_serializer: CategorySerializer, include: [:comments]
      end

      def create
        category = Category.new(category_params)
        if catgory.save
          render json: { status: 'SUCCESS', data: category }
        else
          render json: { status: 'ERROR', data: category.errors }
        end
      end
    
      private
    
      def category_params
        params.require(:category).permit(:name)
      end

    end
  end
end