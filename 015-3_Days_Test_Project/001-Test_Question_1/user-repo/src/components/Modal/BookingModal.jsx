import React, { useRef, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { format } from "date-fns"; // Import the format function
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { addBookings } from '../../store/Booking/bookingActions';

const BookingModal = ({ show, handleClose, listing }) => {

    const email = useSelector(state => state.auth.email);

    const nameRef = useRef("");
    const noOfGuestsRef = useRef("");
    const addressRef = useRef("");
    const cityRef = useRef("");
    const pincodeRef = useRef("");

    // Use state to control the Date values
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");

    const handleSubmit = async () => {
        // Format dates to dd/MM/yyyy
        const bookingDate = format(new Date(), "dd/MM/yyyy");
        const formattedCheckInDate = checkInDate ? format(new Date(checkInDate), "dd/MM/yyyy") : null;
        const formattedCheckOutDate = checkOutDate ? format(new Date(checkOutDate), "dd/MM/yyyy") : null;

        // Gather form data
        const formData = {
            name: nameRef.current.value,
            email: email,
            checkInDate: formattedCheckInDate,
            checkOutDate: formattedCheckOutDate,
            noOfGuests: +noOfGuestsRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            pincode: pincodeRef.current.value,
            status: 'pending',
            listingId: listing.id,
            bookingDate: bookingDate
        };

        const { response, error } = await addBookings(formData);
        console.log(response);
        console.log(error);
        handleClose(); // Close modal after booking is submitted
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="bookingModal">
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>Book Your Stay at {listing.placeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Name Field with Floating Label */}
                    <FloatingLabel controlId="name" label="Name" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            ref={nameRef}
                            required
                        />
                    </FloatingLabel>

                    {/* Date Range - Check-in Date with Floating Label */}
                    <FloatingLabel controlId="checkInDate" label="From" className="mb-4">
                        <Form.Control
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Minimum date is today
                            required
                        />
                    </FloatingLabel>

                    {/* Date Range - Check-out Date with Floating Label */}
                    <FloatingLabel controlId="checkOutDate" label="To" className="mb-4">
                        <Form.Control
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || new Date().toISOString().split("T")[0]} // Minimum date is check-in date
                            required
                        />
                    </FloatingLabel>

                    {/* Number of Guests with Floating Label */}
                    <FloatingLabel controlId="guests" label="Number of Guests" className="mb-4">
                        <Form.Control
                            type="number"
                            min="1"
                            ref={noOfGuestsRef}
                            placeholder="Enter number of guests"
                            required
                        />
                    </FloatingLabel>

                    {/* Address Details with Floating Labels */}
                    <FloatingLabel controlId="address" label="Address" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            ref={addressRef}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="city" label="City" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter your city"
                            ref={cityRef}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="pincode" label="Pincode" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter your pincode"
                            ref={pincodeRef}
                            required
                        />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Book Now
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;
