class CategoryWithAllCommentsSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :comments, serializer: CommentSerializer
end
