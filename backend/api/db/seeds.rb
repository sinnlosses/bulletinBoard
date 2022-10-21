# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.find_or_create_by!(
   email: 'test@example.com',
   encrypted_password: '$2a$12$o2bQ.6dDQ.F34qKoU1kyluuGReSbDiQzp.bAZu47q3zLG7DqzSLmu'
)

Category.find_or_create_by!(
   name: '旅行'
)
Category.find_or_create_by!(
   name: '食べ物'
)
