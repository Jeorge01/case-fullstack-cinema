import React, { useState, useEffect } from 'react';
import { showAlert } from "./AlertFunction";

const MoviePage = ({ movie }) => {
    const [selectedShow, setSelectedShow] = useState(null);
    const [checkedSeats, setCheckedSeats] = useState([]);
    const totalSeats = 36;

    useEffect(() => {
        // Reset selected show and checked seats when movie prop changes
        setSelectedShow(null);
        setCheckedSeats([]);
    }, [movie]);

    const handleShowSelection = (show) => {
        console.log("Selected Show:", show);
        setSelectedShow(show);
        setCheckedSeats([]); // Clear selected seats when a new show is selected
    };

    const handleCheckboxClick = (seatNumber, isBooked) => {
        // Allow clicking only if the seat is not already booked
        if (!isBooked) {
            // Toggle the checked seat
            setCheckedSeats((prevSeats) => {
                if (prevSeats.includes(seatNumber)) {
                    // Remove seat if already selected
                    return prevSeats.filter((seat) => seat !== seatNumber);
                } else {
                    // Add seat if not selected
                    return [...prevSeats, seatNumber];
                }
            });
        }
    };

    const isButtonDisabled = !selectedShow; // Disable the button if no time is selected

    return (
        <div>
            <div className="shows">
                {movie && movie.shows ? (
                    movie.shows.map((show, index) => (
                        <li key={index} className="show">
                            <p>{show.time.slice(5, 10)}</p>
                            <p>{show.time.slice(11, 16)}</p>
                            <input
                                className="showCheckbox"
                                type="radio"
                                name="options"
                                onClick={() => handleShowSelection(show)}
                            />
                        </li>
                    ))
                ) : (
                    <p>No shows available</p>
                )}
            </div>

            <div className="container">
                <div className="screenicon"></div>
            </div>

            <form action="">
                <div className="seats">
                    {[...Array(3).keys()].map((rowIndex) => {
                        const startSeatIndex = rowIndex * 12;
                        const endSeatIndex = startSeatIndex + 12;

                        return (
                            <div key={rowIndex} className={`container gap50`}>
                                {selectedShow
                                    ? selectedShow.seats.slice(startSeatIndex, endSeatIndex).map((seat, index) => (
                                        <div
                                            key={seat.seatNumber}
                                            className={`${seat.seatNumber} parent ${seat.booked ? 'alreadyBooked' : ''} ${checkedSeats.includes(seat.seatNumber) ? 'checked' : ''
                                                }`}
                                        >
                                            <input
                                                className="seatCheckbox"
                                                type="checkbox"
                                                name={seat.seatNumber}
                                                onClick={() => handleCheckboxClick(seat.seatNumber, seat.booked)}
                                                checked={checkedSeats.includes(seat.seatNumber)}
                                                disabled={seat.booked || (checkedSeats.length === 6 && !checkedSeats.includes(seat.seatNumber))}
                                            />
                                        </div>
                                    ))
                                    : [...Array(12).keys()].map((index) => (
                                        <div
                                            key={`empty-${index}`}
                                            className={`empty-${index} parent nonClickable`}
                                        >
                                            {/* Display non-clickable seats */}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </form>

            <form className="bookingSubmit" action="">
                <div className="bookInputs container">
                    <input className="emailInput" type="email" placeholder="Enter your Email and click on book" />
                    <input className="confirmBooking" type="submit" value="Book" on required onClick={showAlert} disabled={isButtonDisabled} />
                </div>
            </form>
        </div>
    );
};

export default MoviePage;
