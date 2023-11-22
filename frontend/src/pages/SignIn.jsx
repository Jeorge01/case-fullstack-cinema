import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReturnToMovies from "../components/ReturnToMovies";

function SignIn() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the existence of the session cookie on component mount
        const sessionKey = document.cookie.replace(/(?:(?:^|.*;\s*)sessionKey\s*=\s*([^;]*).*$)|^.*$/, "$1");

        if (sessionKey) {
            // User is logged in, redirect or perform other actions
            setIsLoggedIn(true);
            // Redirect logic or other actions can be added here
        }
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const isEmail = usernameOrEmail.includes("@");

            // Construct the payload based on the determination
            const payload = {
                password,
            };

            if (isEmail) {
                payload.email = usernameOrEmail;
            } else {
                payload.username = usernameOrEmail;
            }

            const response = await fetch("http://localhost:3123/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log(JSON.stringify(payload));
            if (!response.ok) {
                // Handle authentication failure, show an error message, etc.
                console.error(`Sign-in failed. Server returned ${response.status}: ${response.statusText}`);
                // You might want to update state to display an error message to the user
                return;
            }

            // Authentication successful, you might want to redirect the user or perform other actions
            console.log("Sign-in successful");
            const { sessionKey } = await response.json();

            // Assuming successful sign-in, setIsLoggedIn(true)
            setIsLoggedIn(true);
            navigate('/home');
        } catch (error) {
            // Handle unexpected errors
            console.error("An unexpected error occurred during sign-in:", error);
            // You might want to update state to display an error message to the user
        }
    };

    return (
        <>
            <div className="signIn">
                <header>
                    <div className="container signInDiv">
                        <ReturnToMovies />
                    </div>
                </header>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div>
                        <input
                            type="text"
                            name="usernameOrEmail"
                            id="usernameOrEmail"
                            placeholder="Enter username or email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" value="Sign In" />
                </form>
                <a href="/signUp">Sign Up</a>
            </div>
        </>
    );
}

export default SignIn;
