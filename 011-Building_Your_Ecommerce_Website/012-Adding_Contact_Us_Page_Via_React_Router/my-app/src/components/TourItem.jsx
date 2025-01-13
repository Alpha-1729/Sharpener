import React from "react";
import { Button } from "react-bootstrap";

function TourItem({ date, city, venue }) {
    return (
        <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td>{date}</td>
            <td>{city}</td>
            <td>{venue}</td>
            <td>
                <Button variant="info" style={{ backgroundColor: '#ADD8E6', borderColor: '#ADD8E6' }}>
                    Buy Tickets
                </Button>
            </td>
        </tr>
    );
}

export default TourItem;
