import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReturnToMovies from "../components/ReturnToMovies";


function SignUp() {
    const navigate = useNavigate(); 
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
        console.log("handleChange:", name, value);
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

        console.log("formData before postData:", formData);

        // Prepare the data for the POST request
        const postData = {
            name: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        console.log(postData);

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
            navigate('/signIn');
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
                        <input type="text" name="fullName" id="fullName" placeholder="Full name" onChange={handleChange} />
                        <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                    </div>
                    <div>
                        <input type="text" name="email" id="email" placeholder="Email" onChange={handleChange} />
                        <input type="text" name="confirmEmail" id="confirmEmail" placeholder="Confirm Email" onChange={handleChange} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={handleChange} />
                    </div>

                    <input type="submit" value="Sign Up" />
                </form>
                <a href="/signIn">Sign In</a>
            </div>
        </>
    );
}

export default SignUp;
