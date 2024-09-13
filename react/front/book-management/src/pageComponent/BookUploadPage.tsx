import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/Menu';
import BookUpLoadForm from '../component/BookUploadForm';

function BookFormPage() {
  return (
    <>
      <Header />
      <BookUpLoadForm/>
    </>
  );
}

export default BookFormPage;