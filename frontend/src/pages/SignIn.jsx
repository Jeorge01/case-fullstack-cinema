import React, { useState } from "react";
import ReturnToMovies from "../components/ReturnToMovies";

function SignIn() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3123/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernameOrEmail, password }),
            });

            if (!response.ok) {
                // Handle authentication failure, show an error message, etc.
                console.error(`Sign-in failed. Server returned ${response.status}: ${response.statusText}`);
                // You might want to update state to display an error message to the user
                return;
            }

            // Authentication successful, you might want to redirect the user or perform other actions
            console.log("Sign-in successful");
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
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
