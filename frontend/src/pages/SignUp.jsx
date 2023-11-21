import React, { useState } from "react";
import ReturnToMovies from "../components/ReturnToMovies";

function SignUp() {
    return (
        <>
            <div className="signUp">
                <header>
                    <div className="container signUpDiv">
                        <ReturnToMovies />
                    </div>
                </header>
                <h1>Sign In</h1>
                <form action="">
                    <div>
                        <input type="text" name="fullName" id="fullName" placeholder="Full name"/>
                        <input type="text" name="username" id="username" placeholder="Username"/>
                    </div>
                    <div>
                        <input type="text" name="email" id="email" placeholder="Email"/>
                        <input type="text" name="confirmEmail" id="confirmEmail" placeholder="Confirm Email"/>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"/>
                    </div>

                    <input type="submit" value="Sign In" />
                </form>
                <a href="/signIn">Sign In</a>
            </div>
        </>
    );
}

export default SignUp;
