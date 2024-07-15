import React, { useState } from 'react';
import axios from 'axios';
import Header from './component/UpperMenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookFormPage from './pageComponent/BookUploadPage';
import BookList from './pageComponent/BookList';

export const book_upload_result_path: string = "/book_upload_result";
export const book_list_path: string = "/book_list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookFormPage />} />
        <Route path={book_upload_result_path} element={<BookFormPage />} />
        <Route path={book_list_path} element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;