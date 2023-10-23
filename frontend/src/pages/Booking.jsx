import { useLocation } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import ScrollButton from "../components/ButtonScroll";
import ReturnToMovies from "../components/ReturnToMovies";
import Alert from "../components/BookingTicket";
import showButtons from "../components/ShowButtons";



function Booking() {
    const location = useLocation();
    const { movie } = location.state;


    // function showButtons() {
    //     const options = ["Option 1", "Option 2", "Option 3", "Option 4"]
    //     const [selectedOption, setSelectedOption] = useState(null);
      
    //     const handleShowChange = (e) => {
    //       setSelectedOption(e.target.value);
    //     };
    // }
    
    // <showButtons />

    const contentRef = useRef(null);

    return (
        <div className="booking">
            <ReturnToMovies />
            <div className="container gap2">
                <div>
                    <div>
                        <div className="titlebox">
                            <h2>{movie.title}</h2>
                            <p>By {movie.author}</p>
                        </div>
                        <div className="durationbox">
                            <p>{movie.duration}</p>
                        </div>
                    </div>
                    <div className="descriptionbox">
                        <p>{movie.description}</p>
                    </div>
                </div>
                <div>
                    <img src={movie.imgUrl} />
                </div>
            </div>

            <ScrollButton scrollToContent={contentRef} />

            <div className="bookigSection" ref={contentRef}>
                <h4 className="when">Pick a time and one or multiple seats</h4>

                <div className="shows">
                    {movie.shows.map((show, index) => (
                        <li className="show" key={index}>
                            <p>{show.time.slice(5, 10)}</p>

                            <p>{show.time.slice(11, 16)}</p>
                            <input className={"showCheckbox"} type="radio" name="options" />
                        </li>
                    ))}
                </div>
                
                <div className="container">
                    <div className="screenicon"></div>
                </div>

                <form action="">
                    <div className="seats">
                        <div className="container gap50">

                            {/* {movie.shows[0].map( seat => (<div>{seat}</div>))} */}

                            <div className="A1 parent"><input className="seatCheckbox" type="checkbox" name="A1" /></div>
                            <div className="A2 parent"><input className="seatCheckbox" type="checkbox" name="A2" /></div>
                            <div className="A3 parent"><input className="seatCheckbox" type="checkbox" name="A3" /></div>
                            <div className="A4 parent"><input className="seatCheckbox" type="checkbox" name="A4" /></div>
                            <div className="A5 parent"><input className="seatCheckbox" type="checkbox" name="A5" /></div>
                            <div className="A6 parent"><input className="seatCheckbox" type="checkbox" name="A6" /></div>
                            <div className="A7 parent"><input className="seatCheckbox" type="checkbox" name="A7" /></div>
                            <div className="A8 parent"><input className="seatCheckbox" type="checkbox" name="A8" /></div>
                            <div className="A9 parent"><input className="seatCheckbox" type="checkbox" name="A9" /></div>
                            <div className="A10 parent"><input className="seatCheckbox" type="checkbox" name="A10" /></div>
                            <div className="A11 parent"><input className="seatCheckbox" type="checkbox" name="A11" /></div>
                            <div className="A12 parent"><input className="seatCheckbox" type="checkbox" name="A12" /></div>
                        </div>
                        <div className="container gap50">
                            <div className="A13 parent"><input className="seatCheckbox" type="checkbox" name="A13" /></div>
                            <div className="A14 parent"><input className="seatCheckbox" type="checkbox" name="A14" /></div>
                            <div className="A15 parent"><input className="seatCheckbox" type="checkbox" name="A15" /></div>
                            <div className="A16 parent"><input className="seatCheckbox" type="checkbox" name="A16" /></div>
                            <div className="A17 parent"><input className="seatCheckbox" type="checkbox" name="A17" /></div>
                            <div className="A18 parent"><input className="seatCheckbox" type="checkbox" name="A18" /></div>
                            <div className="A19 parent"><input className="seatCheckbox" type="checkbox" name="A19" /></div>
                            <div className="A20 parent"><input className="seatCheckbox" type="checkbox" name="A20" /></div>
                            <div className="A21 parent"><input className="seatCheckbox" type="checkbox" name="A21" /></div>
                            <div className="A22 parent"><input className="seatCheckbox" type="checkbox" name="A22" /></div>
                            <div className="A23 parent"><input className="seatCheckbox" type="checkbox" name="A23" /></div>
                            <div className="A24 parent"><input className="seatCheckbox" type="checkbox" name="A24" /></div>
                        </div>
                        <div className="container gap50">
                            <div className="A25 parent"><input className="seatCheckbox" type="checkbox" name="A25" /></div>
                            <div className="A26 parent"><input className="seatCheckbox" type="checkbox" name="A26" /></div>
                            <div className="A27 parent"><input className="seatCheckbox" type="checkbox" name="A27" /></div>
                            <div className="A28 parent"><input className="seatCheckbox" type="checkbox" name="A28" /></div>
                            <div className="A29 parent"><input className="seatCheckbox" type="checkbox" name="A29" /></div>
                            <div className="A30 parent"><input className="seatCheckbox" type="checkbox" name="A30" /></div>
                            <div className="A31 parent"><input className="seatCheckbox" type="checkbox" name="A31" /></div>
                            <div className="A32 parent"><input className="seatCheckbox" type="checkbox" name="A32" /></div>
                            <div className="A33 parent"><input className="seatCheckbox" type="checkbox" name="A33" /></div>
                            <div className="A34 parent"><input className="seatCheckbox" type="checkbox" name="A34" /></div>
                            <div className="A35 parent"><input className="seatCheckbox" type="checkbox" name="A35" /></div>
                            <div className="A36 parent"><input className="seatCheckbox" type="checkbox" name="A36" /></div>
                        </div>
                    </div>
                </form>

                <Alert />
                {/* <form className="bookingSubmit" action="">
                    <div className="bookInputs container">
                        <input className="emailInput" type="email" placeholder="Enter your Email and click on book" />
                        <input className="confirmBooking" type="submit" value="Book" required />
                    </div>
                </form> */}


                <div className="someSpace"></div>
            </div>
        </div>
    )
}

export default Booking;
