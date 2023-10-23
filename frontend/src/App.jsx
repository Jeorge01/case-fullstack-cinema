import './App.css';
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Home from './pages/Home';



function App() {

  const [message, setMessage] = useState('');


  useEffect( () => {
    fetch("http://localhost:3123/")
      .then(res => res.json())
      .then(data => setMessage(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/booking/*' element={<Booking />} />
          <Route path='/home' element={<Home />} />
          {/* <Route path='*' element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      <h1>Sallad</h1>
      <p>Hello from frontend !!</p>
      <p>{message.message ? message.message : "Cannot fetch backend data"}</p>
    </div>
  );
}

export default App;