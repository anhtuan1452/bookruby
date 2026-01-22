'use client';

import { useState, useEffect } from 'react';
import { getAuthors, createAuthor, deleteAuthor, Author } from '@/lib/api';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách tác giả');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await createAuthor(formData);
      setFormData({ name: '', email: '', bio: '' });
      loadAuthors();
    } catch (err: any) {
      setError(err.response?.data?.errors?.join(', ') || 'Không thể thêm tác giả');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa tác giả này?')) return;
    
    try {
      await deleteAuthor(id);
      loadAuthors();
    } catch (err) {
      setError('Không thể xóa tác giả');
    }
  };

  if (loading) return <div className="container">Đang tải...</div>;

  return (
    <div className="container">
      <h1>Quản Lý Tác Giả</h1>
      
      <div className="form-card">
        <h2>Thêm Tác Giả Mới</h2>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên tác giả *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tiểu sử</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Thêm Tác Giả</button>
        </form>
      </div>

      <div className="authors-list">
        <h2>Danh Sách Tác Giả ({authors.length})</h2>
        
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <div className="author-info">
              <h3>{author.name}</h3>
              <p className="email">{author.email}</p>
              {author.bio && <p className="bio">{author.bio}</p>}
              {author.books && author.books.length > 0 && (
                <p className="books-count">Số sách: {author.books.length}</p>
              )}
            </div>
            <button 
              onClick={() => handleDelete(author.id)}
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
