import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { book_upload_result_path,book_list_path } from '../App';


function BookUpLoadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isPosted, setPostedFlg] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPosted){ alert("送信済みです"); return; }
    if (!title) { alert("タイトルを指定してください"); return; }
    if (!file) { alert("ファイルを指定してください"); return; } 
    setPostedFlg(true);
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('file', file);
    try {
      axios.post('http://localhost:5173/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {navigate(book_list_path,{ state: response.status });})//console.log('Book created:', response.status);// レスポンス処理console.log('Book created :', response.data);// レスポンス処理
      .catch(error => {navigate(book_list_path,{ state: error });});//console.log('error:', error);// エラーハンドリング
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <>
      <h3 className="text-3xl font-bold dark:text-white">Upload Book Page</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex items-center space-x-2">
          <span className="font-medium">Book Title:</span>
          <input type="text" value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"/>
        </label>
        <label className="flex items-center space-x-2">
          Book Description :
          <textarea value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"/>
        </label>
        <label  className="flex items-center space-x-2">
          Book or PDF File : 
          <input type="file" accept="application/pdf" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (e && e.target && e.target.files) setFile(e.target.files[0]); }}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" />
        </label>
        <button type="submit" className="w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Upload Book
        </button>
      </form>
    </>
  );
}
export default BookUpLoadForm;

// <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
// <label className="flex items-center space-x-2">
//   <span className="font-medium">Title:</span>
//   <input
//     type="text"
//     name="title"
//     value={book.title}
//     onChange={handleChange}
//     className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//   />
// </label>
// <label className="flex items-center space-x-2">
//   <span className="font-medium">Description:</span>
//   <textarea
//     name="description"
//     value={book.description}
//     onChange={handleChange}
//     className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//   />
// </label>
// <label className="flex items-center space-x-2">
//   <span className="font-medium">PDF File:</span>
//   <input
//     type="file"
//     accept="application/pdf"
//     onChange={handleFileChange}
//     className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//   />
// </label>
// <button
//   type="submit"
//   className="w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
// >
//   Create Book
// </button>
// </form>