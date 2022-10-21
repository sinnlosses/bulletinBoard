class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.belongs_to :category, index: true, foreign_key: true
      t.string :name
      t.string :mailaddress
      t.string :subject
      t.string :body, :null => false
      t.boolean :is_shown, :default => true, :null => false
      t.string :poster_id,
      t.timestamps
    end

    
  end
end
