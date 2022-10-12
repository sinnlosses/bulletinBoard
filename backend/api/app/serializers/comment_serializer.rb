class CommentSerializer < ActiveModel::Serializer
  attributes :id, :name, :mailaddress, :subject, :body, :is_shown, :created_at
end
