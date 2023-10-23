import React from 'react';

function ScrollButton({ scrollToContent }) {
    const scrollToBottom = () => {
        scrollToContent.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    return (
        <>
            <div className="container">
                <div onClick={scrollToBottom} className="bookbtnbox">
                    <button  className="scrollButton">Book</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="75" viewBox="0 0 74 75" fill="none">
                        <path d="M22 39.7298L37.0741 54.9268L52.1481 39.7298M37.0741 52.8161V22" stroke="#404040" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </>

    );
}

export default ScrollButton;

