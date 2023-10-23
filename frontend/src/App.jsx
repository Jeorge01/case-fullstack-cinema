import './App.css';
import {useEffect, useState} from "react";


function App() {

  const [message, setMessage] = useState('');


  useEffect( () => {
    fetch("https://probable-winner-r4gvxrj69jp2xppv-5174.app.github.dev/")
      .then(res => res.json())
      .then(data => setMessage(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h1>Sallad</h1>
      <p>Hello from frontend !!</p>
      <p>{message.message ? message.message : "Cannot fetch backend data"}</p>
    </div>
  );
}

export default App;