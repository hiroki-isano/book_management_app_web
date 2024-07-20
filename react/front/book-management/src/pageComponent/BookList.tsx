import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';
import BookForm from '../component/BookForm';
// Book 型の定義 (GORM のモデルに対応)
interface Book {
  id: number;
  title: string;
  author: string;
  // GORM の他のフィールド (例えば、ISBN、出版日など) もここに追加できます
  // createdAt: Date;
  // updatedAt: Date;
}
// {
//   "id": 14,
//   "uuid": "693ebb3d-8fdf-4e76-9ed1-1a31d9733e91",
//   "title": "fdsfds",
//   "description": "sdffsdfs",
//   "file_path": "/book/スクリーンショット 2024-07-13 19.51.13.png",
//   "created_at": "2024-07-15T06:06:49.575Z",
//   "updated_at": "2024-07-15T06:06:49.575Z"
// },
function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://192.168.0.120:5173/getAllBook/');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2">id</th>
            <th className="w-1/4 px-4 py-2">Title</th>
            <th className="w-1/4 px-4 py-2">Author</th>
            <th className="w-1/4 px-4 py-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr>
              <td className="border px-4 py-2">{book.id}</td>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2"><a href=
              {"http://192.168.0.120:5173/download/"+book.id}>link</a></td>
            </tr>))}
        </tbody>
      </table>
    </>
  );
}


export default BookList;