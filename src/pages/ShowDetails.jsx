import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ShowDetails = () => {
    const { showId } = useParams();
    const [showDetails, setShowDetails] = useState(null);
    const [storedBooking, setStoredBooking] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
                const data = await response.json();
                setShowDetails(data);
            } catch (error) {
                console.log('Error fetching show details:', error);
            }
        };

        fetchShowDetails();
    }, [showId]);

    if (!showDetails) {
        return <div>Loading...</div>;
    }

    // Remove Html Tags from Summary
    const removeHtmlTags = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || '';
    };

    const handleAddToLocalStorage = () => {
        const localData = localStorage.getItem('my-bookings');
        const parsedData = localData ? JSON.parse(localData) : [];
        setStoredBooking(parsedData);
        const newBookings = [...parsedData, showDetails];
        localStorage.setItem('my-bookings', JSON.stringify(newBookings));
        Swal.fire({
            title: 'Confirmed!',
            text: 'Your Ticket Confirmed',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }
    return (
        <div id="show-details-container">
            <Container>
                <h3 className="text-danger">Show ID: {showId}</h3>
                <h1>Book You Show Now</h1>
                <p>For explore amazing experience book a show and watch now!</p>

                <div className="card mb-3" id="details-card">
                    <div className="row g-0">
                        <div className="col-md-5" >
                            <img src={showDetails.image?.original} className="img-fluid" style={{ width: '100%' }} alt="" />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Name: {showDetails.name}</h5>
                                <p className="card-text"><span className="text-danger fw-semibold">About:</span> {removeHtmlTags(showDetails.summary)}</p>
                                <div className="d-flex" style={{
                                    width
                                        : "100%", justifyContent: "space-between"
                                }}>
                                    <p className="card-text"><span className="text-danger fw-semibold">Language:</span> {showDetails?.language}</p>
                                    <p className="card-text"><span className="text-danger fw-semibold">Runtime:</span> {showDetails?.runtime} min</p>
                                </div>

                                <button onClick={handleShow} className="btn btn-danger" style={{ width: '100%' }}>Book Movie Ticket</button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirm Your Ticket</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Movie Name</Form.Label>
                                                <h3 className="fs-4">{showDetails.name}</h3>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                            >
                                                <Form.Label>Genres</Form.Label>
                                                <div className="d-flex" style={{ width: '80%', justifyContent: 'space-between' }}>
                                                    <li className="fs-6 fw-semibold" style={{ listStyle: 'none' }}>{showDetails?.genres?.[0]}</li>
                                                    <li className="fs-6 fw-semibold" style={{ listStyle: 'none' }}>{showDetails?.genres?.[1]}</li>
                                                    <li className="fs-6 fw-semibold text-danger" style={{ listStyle: 'none' }}>Premiered: {showDetails?.premiered}</li>
                                                </div>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                            >
                                                <Form.Label>Movie Description:</Form.Label>
                                                <div className="d-flex">
                                                    <li className="fs-6 fw-semibold" style={{ listStyle: 'none' }}>{removeHtmlTags(showDetails.summary)}</li>
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={handleAddToLocalStorage}>
                                            Confirm Booking
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ShowDetails;