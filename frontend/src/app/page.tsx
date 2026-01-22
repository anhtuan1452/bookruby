import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>📚 Hệ Thống Quản Lý Sách và Tác Giả</h1>
        <p>Quản lý thông tin sách và tác giả một cách đơn giản và hiệu quả</p>
        
        <div className="home-cards">
          <Link href="/authors" className="home-card">
            <h2>👤 Quản Lý Tác Giả</h2>
            <p>Thêm, xem và quản lý thông tin tác giả</p>
          </Link>
          
          <Link href="/books" className="home-card">
            <h2>📖 Quản Lý Sách</h2>
            <p>Thêm, xem và quản lý thông tin sách</p>
          </Link>
        </div>
      </div>
      
      <div className="features">
        <h2>Tính năng</h2>
        <ul>
          <li>✅ Thêm và quản lý tác giả</li>
          <li>✅ Thêm và quản lý sách</li>
          <li>✅ Liên kết sách với tác giả</li>
          <li>✅ API RESTful với Ruby on Rails</li>
          <li>✅ Giao diện hiện đại với Next.js</li>
          <li>✅ Containerized với Docker</li>
        </ul>
      </div>
    </div>
  );
}
