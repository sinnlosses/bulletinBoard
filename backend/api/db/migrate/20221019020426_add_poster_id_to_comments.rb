class AddPosterIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :poster_id, :string
  end
end
