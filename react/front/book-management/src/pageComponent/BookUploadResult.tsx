import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';
import BookForm from '../component/BookForm';
import { useLocation } from 'react-router-dom';
import { book_list_path, book_upload_path } from '../App';

function BookUploadResult() {
  const location = useLocation();
  return (
    <>
      <Header />
      <div>
      {location.state === 200 ? (
        <p>アップロード成功！</p>
      ) : (
        <p>アップロード失敗しました。</p>
      )}
    </div>
      <ul>
        <li><a href={book_list_path} className="hover:underline">・Book List</a></li>
        <li><a href={book_upload_path} className="hover:underline">・Upload Book</a></li>
      </ul>
    </>
  );
}

export default BookUploadResult;