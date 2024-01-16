import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContainer from "./components/AuthContainer";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserSettings from "./pages/UserSettings";
import ChangeData from "./pages/ChangeData";
import SeeBookings from "./pages/SeeBookings";

function App() {
    const [message, setMessage] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3123/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setMessage(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    // useEffect(() => {
    //     console.log('isLoggedIn in App useEffect:', isLoggedIn);
    // }, [isLoggedIn]);

    // Function to handle user login
    // const handleLogin = () => {
    //     setIsLoggedIn(true);
    //     console.log("User logged in. isLoggedIn set to true");
    // };

    // // Function to handle user logout
    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     console.log("User logged out. isLoggedIn set to false");
    // };

    return (
        <div>
            {isLoggedIn ? "user is logged in" : "user is not logged in"}
            <BrowserRouter>
                <AuthContainer setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
                    <Routes>
                        {/* <Route index element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path="/booking/*" element={<Booking isLoggedIn={isLoggedIn} />} />
                        <Route path="/signIn/" element={<SignIn isLoggedIn={isLoggedIn} />} />
                        <Route path="/signUp/" element={<SignUp />} />
                        <Route path="/userSettings/*" element={<UserSettings isLoggedIn={isLoggedIn} />} />
                        <Route path="/changeData/*" element={<ChangeData isLoggedIn={isLoggedIn} />} />
                        <Route path="/seeBookings/*" element={<SeeBookings isLoggedIn={isLoggedIn} />} /> */}
                        {/* <Route path='*' element={<NoPage />} /> */}
                    </Routes>
                </AuthContainer>
            </BrowserRouter>
            {/* <h1>Sallad</h1>
      <p>Hello from frontend !!</p>
      <p>{message.message ? message.message : "Cannot fetch backend data"}</p> */}
        </div>
    );
}

export default App;
