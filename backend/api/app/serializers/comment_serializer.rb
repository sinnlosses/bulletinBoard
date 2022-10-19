class CommentSerializer < ActiveModel::Serializer
  attributes :id, :name, :mailaddress, :subject, :body, :is_shown, :poster_id, :created_at
end
