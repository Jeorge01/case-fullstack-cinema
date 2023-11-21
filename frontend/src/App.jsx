import './App.css';
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserSettings from './pages/UserSettings';
import ChangeData from './pages/ChangeData';
import SeeBookings from './pages/SeeBookings';

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
          <Route path='/home' element={<Home />} />
          <Route path='/booking/*' element={<Booking />} />
          <Route path='/signIn/*' element={<SignIn />} />
          <Route path='/signUp/*' element={<SignUp />} />
          <Route path='/userSettings/*' element={<UserSettings />} />
          <Route path='/changeData/*' element={<ChangeData />} />
          <Route path='/seeBookings/*' element={<SeeBookings />} />
          {/* <Route path='*' element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <h1>Sallad</h1>
      <p>Hello from frontend !!</p>
      <p>{message.message ? message.message : "Cannot fetch backend data"}</p> */}
    </div>
  );
}

export default App;