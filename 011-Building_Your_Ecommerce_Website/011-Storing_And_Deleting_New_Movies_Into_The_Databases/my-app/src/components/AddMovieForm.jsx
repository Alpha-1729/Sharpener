import React, { useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";


function AddMovieForm({ onAddMovie }) {
    const titleRef = useRef("");
    const openingTextRef = useRef("");
    const releaseDateRef = useRef("");

    function formSubmitHandler(e) {
        e.preventDefault();
        const newMovie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        };
        titleRef.current.value = '';
        openingTextRef.current.value = '';
        releaseDateRef.current.value = null;
        onAddMovie(newMovie);
    }
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >

            <Form onSubmit={formSubmitHandler}>
                <Form.Group as={Row} className="mb-4" controlId="movieTitle">
                    <Form.Label column sm={3} style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                        Title
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            ref={titleRef}
                            type="text"
                            placeholder="Enter movie title"
                            style={{ fontSize: "1.25rem", padding: "10px" }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="openingText">
                    <Form.Label column sm={3} style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                        Opening Text
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as="textarea"
                            ref={openingTextRef}
                            rows={3}
                            placeholder="Enter opening text"
                            style={{ fontSize: "1.25rem", padding: "10px" }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="releaseDate">
                    <Form.Label column sm={3} style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                        Release Date
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            ref={releaseDateRef}
                            type="date"
                            style={{ fontSize: "1.25rem", padding: "10px" }}
                        />
                    </Col>
                </Form.Group>

                <div style={{ textAlign: "right" }}>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{
                            backgroundColor: "#230052",
                            borderColor: "#230052",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                            padding: "10px 20px",
                        }}
                    >
                        Add Movie
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddMovieForm;
