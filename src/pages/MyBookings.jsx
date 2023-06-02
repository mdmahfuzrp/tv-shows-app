import { useEffect, useState } from "react";

const MyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('my-bookings');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        setMyBookings(parsedData);
    }, []);

    // Remove Html Tags from Summary
    const removeHtmlTags = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;

        const summaryString = div.textContent || div.innerText || '';

        const words = summaryString?.split(' ');
        const summary = words?.slice(0, 5).join(' ');

        return summary;
    };
    return (
        <div>
        <h1 className="fs-4 text-center pt-4">My All Bookings</h1>
            {
                myBookings.length > 0 ? <div className="parent-my-bookings">
                    {
                        myBookings.map((myBooking, index) => <div
                            className="single-my-booking"
                            key={index}
                        >
                            <div className="d-flex parent-start-details">
                                <div className="my-booking-img">
                                    <img src={myBooking?.image?.original} alt="" />
                                </div>
                                <div className="my-booking-info">
                                    <p className="text-danger">{myBooking?.name}</p>
                                    <small>{removeHtmlTags(myBooking?.summary)}..read more</small>
                                </div>
                            </div>
                            <div className="my-booking-date">
                                <p className="text-danger">{myBooking?.premiered}</p>
                            </div>
                        </div>)
                    }
                </div> : <p className="text-secondary text-center py-5">Please add some bookings</p>
            }
        </div>
    );
};

export default MyBookings;