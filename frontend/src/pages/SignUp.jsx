import React, { useState } from "react";
import ReturnToMovies from "../components/ReturnToMovies";

function SignUp() {
    console.log("Rendering SignUp component");
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords and emails match before submitting
        if (formData.email !== formData.confirmEmail) {
            alert("Emails do not match!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare the data for the POST request
        const postData = {
            name: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch("http://localhost:3123/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorMessage = `Failed to create user. Server returned ${response.status}: ${response.statusText}`;
                console.error(errorMessage);
                alert(errorMessage);
                return;
            }

            // Handle success, e.g., redirect the user or show a success message
            console.log("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="signUp">
                <header>
                    <div className="container signUpDiv">
                        <ReturnToMovies />
                    </div>
                </header>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="fullName" id="fullName" placeholder="Full name" />
                        <input type="text" name="username" id="username" placeholder="Username" />
                    </div>
                    <div>
                        <input type="text" name="email" id="email" placeholder="Email" />
                        <input type="text" name="confirmEmail" id="confirmEmail" placeholder="Confirm Email" />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password" />
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password"
                        />
                    </div>

                    <input type="submit" value="Sign Up" />
                </form>
                <a href="/signIn">Sign In</a>
            </div>
        </>
    );
}

export default SignUp;
