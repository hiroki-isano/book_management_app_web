import React, { useState } from 'react';
import axios from 'axios';

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
      //http://192.168.0.120:5173/upload
      //const response = await axios.post('/api/books', formData, {
      //Failed to load resource: Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin. Status code: 403
      //const response = await axios.post('http://192.168.0.120:5173/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const response = await axios.post('http://localhost:5173/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log('Book created:', response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
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
        <input type="file" accept="application/pdf" onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{ 
          if (e && e.target && e.target.files) setFile(e.target.files[0]);
        }} />
      </label>
      <button type="submit">Create Book</button>
    </form>
  );
}

export default BookForm;
// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// type Fruit = {
//   id: number;
//   name: string;
//   icon: string;
// }

// function App() {
//   const [fruits, setFruits] = useState<Fruit[]>([{ id: 0, name: "", icon: "" }])

//   useEffect(() => {
//     (
//       async () => {
//         // const data = await axios.get("http://localhost:5173")
//         // console.log(data.data)
//         // console.log(data.data[0])
//         // setFruits(data.data)
//       }
//     )()
//   }, [])

//   return (
//     <div>
//       {fruits.map(fruit => (
//         <p key={fruit.id}>
//           <span>{fruit.name}</span>
//           <span>{fruit.icon}</span>
//         </p>
//       )
//       )
//       }
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// type Fruit = {
//   id: number;
//   name: string;
//   icon: string;
// }

// function App() {
//   const [fruits, setFruits] = useState<Fruit[]>([{ id: 0, name: "", icon: "" }])

//   return (
//     <div>
//       {fruits.map(fruit => (
//         <p key={fruit.id}>
//           <span>{fruit.name}</span>
//           <span>{fruit.icon}</span>
//         </p>
//       )
//       )
//       }
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
