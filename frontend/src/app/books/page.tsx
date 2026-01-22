'use client';

import { useState, useEffect } from 'react';
import { getBooks, createBook, deleteBook, getAuthors, Book, Author } from '@/lib/api';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    published_year: new Date().getFullYear(),
    description: '',
    author_id: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [booksData, authorsData] = await Promise.all([
        getBooks(),
        getAuthors(),
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải dữ liệu');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.author_id) {
      setError('Vui lòng chọn tác giả');
      return;
    }
    
    try {
      await createBook({
        ...formData,
        author_id: parseInt(formData.author_id),
      });
      setFormData({
        title: '',
        isbn: '',
        published_year: new Date().getFullYear(),
        description: '',
        author_id: '',
      });
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.errors?.join(', ') || 'Không thể thêm sách');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
    
    try {
      await deleteBook(id);
      loadData();
    } catch (err) {
      setError('Không thể xóa sách');
    }
  };

  if (loading) return <div className="container">Đang tải...</div>;

  return (
    <div className="container">
      <h1>Quản Lý Sách</h1>
      
      <div className="form-card">
        <h2>Thêm Sách Mới</h2>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>ISBN *</label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Năm xuất bản *</label>
            <input
              type="number"
              value={formData.published_year}
              onChange={(e) => setFormData({ ...formData, published_year: parseInt(e.target.value) })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tác giả *</label>
            <select
              value={formData.author_id}
              onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
              required
            >
              <option value="">-- Chọn tác giả --</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Thêm Sách</button>
        </form>
      </div>

      <div className="books-list">
        <h2>Danh Sách Sách ({books.length})</h2>
        
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="isbn">ISBN: {book.isbn}</p>
              <p className="author">Tác giả: {book.author?.name}</p>
              <p className="year">Năm: {book.published_year}</p>
              {book.description && <p className="description">{book.description}</p>}
            </div>
            <button 
              onClick={() => handleDelete(book.id)}
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
