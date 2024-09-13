import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Menu';
import BookUpLoadForm from '../component/BookUploadForm';
// Book 型の定義 (GORM のモデルに対応)
interface Book {
  id: number;
  title: string;
  author: string;
}
  // GORM の他のフィールド (例えば、ISBN、出版日など) もここに追加できます
  // createdAt: Date;
  // updatedAt: Date;

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>('http://192.168.0.120:5173/getAllBook/');
      setBooks(response.data);
    } catch (error) { console.error(error); }
  };
  useEffect(() => { fetchBooks(); }, []);

  const handleDelete =  (str:string | undefined) => {
    if(str==undefined)return;
    const exeURL = async () => {
      const response = await fetch(str, { method: 'DELETE',});
      if (response.ok) window.location.reload();// 削除成功
    }
    try {
      exeURL();
    } catch (error) {
      console.error('Error:', error);
    } 
  };

  return (
    <>
      <Header />
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2 border">id</th>
            <th className="w-1/4 px-4 py-2 border">Title</th>
            {/* <th className="w-1/4 px-4 py-2">Author</th> */}
            <th className="w-1/4 px-4 py-2 border">URL</th>
            <th className="w-1/4 px-4 py-2 border">Del</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr>
              <td className="border px-4 py-2">{book.id}</td>
              <td className="border px-4 py-2">{book.title}</td>
              {/* <td className="border px-4 py-2">{book.author}</td> */}
              <td className="border px-4 py-2"><a href={"http://192.168.0.120:5173/download/"+book.id}>link</a></td>
              {/* <td className="border px-4 py-2"><a href={"http://192.168.0.120:5173/delete/"+book.id}>Del</a></td> */}
              
              <td className="border px-4 py-2"><button onClick={()=>handleDelete("http://192.168.0.120:5173/delete/"+book.id)}>Del</button></td>
            </tr>))}
        </tbody>
      </table>
    </>
  );
}


export default BookList;