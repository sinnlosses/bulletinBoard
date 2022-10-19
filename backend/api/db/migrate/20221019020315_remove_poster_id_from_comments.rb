class RemovePosterIdFromComments < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :posterId, :string
  end
end
