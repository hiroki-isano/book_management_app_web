import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';
import BookForm from '../component/BookForm';
import { useLocation } from 'react-router-dom';

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
    </>
  );
}

export default BookUploadResult;