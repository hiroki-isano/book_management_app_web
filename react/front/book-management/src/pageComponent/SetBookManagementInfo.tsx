import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Menu';
import BookUpLoadForm from '../component/BookUploadForm';
function BookManagementInfo() {
    return (
      <>
        <Header />
        <BookUpLoadForm/>
      </>
    );
  }