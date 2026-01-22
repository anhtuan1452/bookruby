import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  books?: Book[];
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  published_year: number;
  description?: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  author?: Author;
}

// Authors API
export const getAuthors = async (): Promise<Author[]> => {
  const response = await api.get('/authors');
  return response.data;
};

export const getAuthor = async (id: number): Promise<Author> => {
  const response = await api.get(`/authors/${id}`);
  return response.data;
};

export const createAuthor = async (author: Partial<Author>): Promise<Author> => {
  const response = await api.post('/authors', { author });
  return response.data;
};

export const updateAuthor = async (id: number, author: Partial<Author>): Promise<Author> => {
  const response = await api.put(`/authors/${id}`, { author });
  return response.data;
};

export const deleteAuthor = async (id: number): Promise<void> => {
  await api.delete(`/authors/${id}`);
};

// Books API
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

export const getBook = async (id: number): Promise<Book> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (book: Partial<Book>): Promise<Book> => {
  const response = await api.post('/books', { book });
  return response.data;
};

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
  const response = await api.put(`/books/${id}`, { book });
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export default api;
