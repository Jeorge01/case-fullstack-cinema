import React, { useState, useEffect } from "react";
import { showAlert } from "./AlertFunction";

async function handleOnSubmit(e, movie, selectedShow, checkedSeats, setCheckedSeats, setSelectedShow, fetchBookedSeats) {
    e.preventDefault();
    const name = document.querySelector(".nameInput").value;
    const email = document.querySelector(".emailInput").value;

    if (!selectedShow) {
        showAlert("Please select a show time.");
        return;
    }

    if (checkedSeats.length === 0) {
        showAlert("Please select at least one seat.");
        return;
    }

    if (name.length < 2) {
        showAlert("Please enter a valid name with at least 2 letters.");
        return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showAlert("Please enter a valid email address.");
        return;
    }

    try {
        const postData = {
            name: name,
            email: email,
            bookedAt: new Date().toISOString(),
            title: selectedShow ? movie.title : "",
            room: selectedShow ? selectedShow.room : "",
            time: selectedShow ? selectedShow.time : "",
            seats: checkedSeats.map((seatNumber) => ({ seatNumber })),
        };

        const response = await fetch("http://localhost:3123/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            const errorMessage = `Failed to book the show. Server returned ${response.status}: ${response.statusText}`;
            console.error(errorMessage);
            window.alert(errorMessage);
            return;
        }

        // Update the state if booking is successful
        setCheckedSeats([]);
        setSelectedShow((prevShow) => {
            if (prevShow) {
                const updatedSeats = prevShow.seats.map((seat) =>
                    checkedSeats.includes(seat.seatNumber) ? { ...seat, booked: true } : seat
                );
                return { ...prevShow, seats: updatedSeats };
            }
            return prevShow;
        });

        window.alert("Booking successful!");
    } catch (error) {
        console.error("Error booking the show:", error);
        window.alert("An unexpected error occurred. Please try again.");
    }
}

const MoviePage = ({ movie }) => {
    const [selectedShow, setSelectedShow] = useState(null);
    const [checkedSeats, setCheckedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const totalSeats = 36;

    const fetchBookedSeats = async () => {
        try {
          const response = await fetch(
            `http://localhost:3123/booked-seats?movieId=${movie.id}&showTime=${selectedShow.time}`
          );
    
          if (!response.ok) {
            console.error("Failed to fetch booked seats:", response.statusText);
            return;
          }
    
          const bookedSeatsData = await response.json();
          setBookedSeats(bookedSeatsData);
        } catch (error) {
          console.error("Error fetching booked seats:", error);
        }
      };

    useEffect(() => {
        // Fetch booked seats on component mount or when movie changes
        if (movie && selectedShow) {
          fetchBookedSeats();
        }
      }, [movie, selectedShow]);

    const handleShowSelection = (show) => {
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
                                              className={`${seat.seatNumber} parent ${
                                                  seat.booked ? "alreadyBooked" : ""
                                              } ${checkedSeats.includes(seat.seatNumber) ? "checked" : ""}`}
                                          >
                                              <input
                                                  className="seatCheckbox"
                                                  type="checkbox"
                                                  name={seat.seatNumber}
                                                  onChange={() => handleCheckboxClick(seat.seatNumber, seat.booked)}
                                                  checked={checkedSeats.includes(seat.seatNumber)}
                                                  disabled={
                                                      seat.booked ||
                                                      (checkedSeats.length === 6 &&
                                                          !checkedSeats.includes(seat.seatNumber))
                                                  }
                                              />
                                          </div>
                                      ))
                                    : [...Array(12).keys()].map((index) => (
                                          <div key={`empty-${index}`} className={`empty-${index} parent nonClickable`}>
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
                    <input className="nameInput" type="text" placeholder="Enter name" />
                    <input className="emailInput" type="email" placeholder="Enter your Email and click on book" />
                    <input
                        className="confirmBooking"
                        type="submit"
                        onClick={(e) =>
                            handleOnSubmit(e, movie, selectedShow, checkedSeats, setCheckedSeats, setSelectedShow)
                        }
                        value="Book"
                        required
                        disabled={isButtonDisabled}
                    />
                </div>
            </form>
        </div>
    );
};

export default MoviePage;
