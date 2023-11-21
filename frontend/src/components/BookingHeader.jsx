import ReturnToMovies from "./ReturnToMovies";

function BookingHeader({ setSearchString, searchString }) {
    return (
        <>
            <header className="bookingHeader">
                <div className="bookingContainer">
                    <ReturnToMovies />
                    <a href="/signIn" className="signInBtn">Sign In</a>
                </div>
            </header>
        </>
    );
}
export default BookingHeader;
