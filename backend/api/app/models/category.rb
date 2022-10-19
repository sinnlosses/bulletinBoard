class Category < ApplicationRecord
    has_many :comments, -> { order("created_at asc") }, dependent: :destroy
end
