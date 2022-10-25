class CategoryWithShownCommentsSerializer < ActiveModel::Serializer
    attributes :id, :name, :created_at
    has_many :comments, serializer: CommentSerializer do
        object.comments.where(is_shown: true)
    end
end
