# Seed data for development
puts "Clearing existing data..."
Book.destroy_all
Author.destroy_all

puts "Creating authors..."
author1 = Author.create!(
  name: "Nguyễn Nhật Ánh",
  email: "nna@example.com",
  bio: "Nhà văn nổi tiếng Việt Nam"
)

author2 = Author.create!(
  name: "Tô Hoài",
  email: "th@example.com",
  bio: "Nhà văn Việt Nam nổi tiếng với tác phẩm thiếu nhi"
)

puts "Creating books..."
Book.create!([
  {
    title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
    isbn: "978-1234567890",
    published_year: 2014,
    description: "Tiểu thuyết về tuổi thơ",
    author: author1
  },
  {
    title: "Mắt Biếc",
    isbn: "978-1234567891",
    published_year: 2010,
    description: "Câu chuyện tình yêu dang dở",
    author: author1
  },
  {
    title: "Dế Mèn Phiêu Lưu Ký",
    isbn: "978-1234567892",
    published_year: 1941,
    description: "Truyện thiếu nhi kinh điển",
    author: author2
  }
])

puts "Seeding completed! Created #{Author.count} authors and #{Book.count} books."
