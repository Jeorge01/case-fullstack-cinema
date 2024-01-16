import React, { useState, useEffect, useRef } from 'react';
import ScrollButton from "../components/ButtonScroll";
import ReturnToMovies from "../components/ReturnToMovies";
import BookingHeader from "../components/BookingHeader";
import showButtons from "../components/ShowButtons";
import MoviePage from "../components/TimeAndSeatComponent";
import { useLocation } from "react-router-dom";

function Booking({ isLoggedIn }) {   
    
    console.log("isLoggedIn, booking", isLoggedIn);
    const location = useLocation();
    const { movie } = location.state || { movie: {} };
    const contentRef = useRef(null);

    useEffect(() => {
        // console.log('location.state:', location.state);
        // console.log('movie:', movie);
        
    }, [location.state, movie]);

    const [searchString, setSearchString] = useState("");

    return (
        <div className="booking">
            {isLoggedIn ? "user is logged in" : "user is not logged in"}
            <BookingHeader isLoggedIn={isLoggedIn} setSearchString={setSearchString} searchString={searchString} />
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

                <MoviePage movie={movie} contentRef={contentRef} isLoggedIn={isLoggedIn} />

                <div className="someSpace"></div>
            </div>
        </div>
    )
}

export default Booking;
