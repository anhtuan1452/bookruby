class Book < ApplicationRecord
  belongs_to :author
  
  validates :title, presence: true
  validates :isbn, presence: true, uniqueness: true
  validates :published_year, presence: true, numericality: { only_integer: true }
end
