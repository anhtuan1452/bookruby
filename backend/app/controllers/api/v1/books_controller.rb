module Api
  module V1
    class BooksController < ApplicationController
      before_action :set_book, only: [:show, :update, :destroy]
      
      def index
        @books = Book.includes(:author).all
        render json: @books.as_json(include: :author)
      end
      
      def show
        render json: @book.as_json(include: :author)
      end
      
      def create
        @book = Book.new(book_params)
        
        if @book.save
          render json: @book.as_json(include: :author), status: :created
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def update
        if @book.update(book_params)
          render json: @book.as_json(include: :author)
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def destroy
        @book.destroy
        head :no_content
      end
      
      private
      
      def set_book
        @book = Book.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Book not found' }, status: :not_found
      end
      
      def book_params
        params.require(:book).permit(:title, :isbn, :published_year, :description, :author_id)
      end
    end
  end
end
