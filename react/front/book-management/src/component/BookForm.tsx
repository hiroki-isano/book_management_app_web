import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/UpperMenu';


function BookForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    if(file)formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5173/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log('Book created:', response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          PDF File:
          <input type="file" accept="application/pdf" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e && e.target && e.target.files) setFile(e.target.files[0]);
          }} />
        </label>
        <button type="submit">Create Book</button>
      </form>
    </>
  );
}

export default BookForm;