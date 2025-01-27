import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./PriceFilter.module.css";

const PriceFilter = ({ applyFilter }) => {
    // Use state to track the values of the input fields
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Handle Apply button click
    const handleApplyFilter = () => {
        const min = minPrice ? parseFloat(minPrice) : 0; // Default to 0 if empty
        const max = maxPrice ? parseFloat(maxPrice) : Infinity; // Default to Infinity if empty
        applyFilter(min, max);
    };

    return (
        <div className={styles.filterContainer}>
            <h4>Filter by Price</h4>
            <Row className={styles.filterRow}>
                <Col md={4}>
                    <Form.Group controlId="minPrice">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)} // Update state on change
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="maxPrice">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)} // Update state on change
                        />
                    </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                    <Button
                        variant="primary"
                        onClick={handleApplyFilter}
                    >
                        Apply
                    </Button>
                </Col>
            </Row>
            {minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice) && (
                <div className="text-danger mt-2">
                    Min price cannot be greater than max price.
                </div>
            )}
        </div>
    );
};

export default PriceFilter;
