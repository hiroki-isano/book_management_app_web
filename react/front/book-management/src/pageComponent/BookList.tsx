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
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr>
              <td className="border px-4 py-2">{book.id}</td>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
            </tr>))}
        </tbody>
      </table>
    </>
  );
}


export default BookList;