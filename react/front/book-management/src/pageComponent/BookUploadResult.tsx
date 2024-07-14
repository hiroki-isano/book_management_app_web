import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';
import BookForm from '../component/BookForm';

function BookUploadResult() {
  return (
    <>
      <Header />
      <a>
      upload success
      </a>
      <a>
      upload failure
      </a>
    </>
  );
}

export default BookUploadResult;