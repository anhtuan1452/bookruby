import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Quản Lý Sách và Tác Giả',
  description: 'Hệ thống quản lý sách và tác giả đơn giản',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-brand">📚 Quản Lý Sách</Link>
            <div className="nav-links">
              <Link href="/authors">Tác Giả</Link>
              <Link href="/books">Sách</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
