import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';
import BookForm from '../component/BookForm';

function BookFormPage() {
  return (
    <>
      <Header />
      <BookForm/>
    </>
  );
}

export default BookFormPage;