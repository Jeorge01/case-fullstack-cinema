// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home"; // Import your Home component
import Booking from "../pages/Booking";
import UserSettings from "../pages/UserSettings";
import ChangeData from "../pages/ChangeData";
import SeeBookings from "../pages/SeeBookings";


const AuthContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route index element={<Home />} />
            {/* Render the SignIn component and pass isLoggedIn and setIsLoggedIn as props */}
            <Route path="/signin" element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signUp/" element={<SignUp />} />

            {/* Render the Home component and pass isLoggedIn as a prop */}
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/booking" element={<Booking isLoggedIn={isLoggedIn} />} />
            <Route path="/userSettings" element={<UserSettings isLoggedIn={isLoggedIn} />} />
            <Route path="/changeUserData" element={<ChangeData isLoggedIn={isLoggedIn} />} />
            <Route path="/users" element={<SeeBookings isLoggedIn={isLoggedIn} />} />
        </Routes>
    );
};

export default AuthContainer;