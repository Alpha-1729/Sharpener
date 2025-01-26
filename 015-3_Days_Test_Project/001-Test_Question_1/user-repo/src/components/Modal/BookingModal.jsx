import React, { useRef, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
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

    // Use state to control the DatePicker values
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const handleSubmit = async () => {
        // Format dates to dd/MM/yyyy
        const bookingDate = format(new Date(), "dd/MM/yyyy");
        const formattedCheckInDate = checkInDate ? format(checkInDate, "dd/MM/yyyy") : null;
        const formattedCheckOutDate = checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : null;

        // Gather form data
        const formData = {
            name: nameRef.current.value,
            email: email,
            checkInDate: formattedCheckInDate,
            checkOutDate: formattedCheckOutDate,
            noOfGuests: noOfGuestsRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            pincode: pincodeRef.current.value,
            status: 'pending',
            listingId: listing.id,
            bookingDate: bookingDate
        };

        await addBookings(formData);
        handleClose(); // Close modal after booking is submitted
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Book Your Stay at {listing.placeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Name Field with Floating Label */}
                    <FloatingLabel controlId="name" label="Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            ref={nameRef}
                            required
                        />
                    </FloatingLabel>

                    {/* Date Range */}
                    <Form.Group controlId="checkInDate" className="mb-3">
                        <Form.Label>Check-in Date</Form.Label>
                        <DatePicker
                            selected={checkInDate} // Use state for selected date
                            onChange={(date) => setCheckInDate(date)} // Update state on date change
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Check-in Date"
                            minDate={new Date()}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="checkOutDate" className="mb-3">
                        <Form.Label>Check-out Date</Form.Label>
                        <DatePicker
                            selected={checkOutDate} // Use state for selected date
                            onChange={(date) => setCheckOutDate(date)} // Update state on date change
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Check-out Date"
                            minDate={checkInDate || new Date()} // Ensure Check-out is after Check-in
                            required
                        />
                    </Form.Group>

                    {/* Number of Guests with Floating Label */}
                    <FloatingLabel controlId="guests" label="Number of Guests" className="mb-3">
                        <Form.Control
                            type="number"
                            min="1"
                            ref={noOfGuestsRef}
                            placeholder="Enter number of guests"
                            required
                        />
                    </FloatingLabel>

                    {/* Address Details with Floating Labels */}
                    <FloatingLabel controlId="address" label="Address" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            ref={addressRef}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="city" label="City" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter your city"
                            ref={cityRef}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="pincode" label="Pincode" className="mb-3">
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
