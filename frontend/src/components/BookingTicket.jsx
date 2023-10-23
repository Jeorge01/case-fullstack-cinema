import React from "react"
import { showAlert } from "./AlertFunction"

function Alert() {
    return (
        <form className="bookingSubmit" action="">
            <div className="bookInputs container">
                <input className="emailInput" type="email" placeholder="Enter your Email and click on book" />
                <input className="confirmBooking" type="submit" value="Book" required onClick={showAlert} />
            </div>
        </form>
    );
}

export default Alert;