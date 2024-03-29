import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import DataFetcher from "../components/DataFetcher";

function Home({ isLoggedIn }) {
    console.log("isLoggedIn, johannes", isLoggedIn);
    const [seatData, setSeatData] = useState([]); // Store the seat booking data
    const [checkboxes, setCheckboxes] = useState([]); // Store the checkbox statuses

    // state to store cinema data
    const [cinemaData, setCinemaData] = useState(null);

    // state to track if application is loading
    const [loading, setLoading] = useState(true);

    // state to track any error message
    const [error, setError] = useState(null);

    const [searchString, setSearchString] = useState("");


    // useEffect(() => {
    //     console.log("Home - isLoggedIn:", isLoggedIn);
    // }, [isLoggedIn]);

    // trigger the arrow function inside useEffect ONE time before loading
    useEffect(() => {
        console.log("Home - useEffect for fetching data");
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3123/movies");

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCinemaData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // check if loading, if true then we should display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // check if there is an error, if true then we should display it
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredMovies = cinemaData.cinema.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchString.toLowerCase())
    );

    console.log("Home - isLoggedIn (render):", isLoggedIn);

    return (
        <div className="home">
        {isLoggedIn ? "user is logged in" : "user is not logged in"}
            <HomeHeader isLoggedIn={isLoggedIn} setSearchString={setSearchString} searchString={searchString} />
            {/* <h1>hej</h1> */}
            <div className="container gap cardboxes">
                {filteredMovies.map((movie) => (
                    <Link to={"/booking/"} state={{ movie }} key={movie.title}>
                        <div className="card" key={movie.title}>
                            <div className="fade"></div>
                            <img className="cardpicture" src={movie.imgUrl} />
                            <h4 className="cardtitle">{movie.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
