import { useState, useEffect } from 'react';

function DataFetcher() {
    const [seatData, setSeatData] = useState([]); // Store the seat booking data
    const [checkboxes, setCheckboxes] = useState([]); // Store the checkbox statuses


    // state to store cinema data
    const [cinemaData, setCinemaData] = useState(null);

    // state to track if application is loading
    const [loading, setLoading] = useState(true);

    // state to track any error message
    const [error, setError] = useState(null);

    const [searchString, setSearchString] = useState("");

    // trigger the arrow function inside useEffect ONE time before loading
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../public/cinema.json');


                if (!response.ok) {
                    throw new Error('Network response was not ok');
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

    return <></>;
}

export default DataFetcher;