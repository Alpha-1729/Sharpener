import React from "react";
import { Table } from 'react-bootstrap';
import TourItem from "./TourItem";

const tourDates = [
    { date: "JUL 16", city: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
    { date: "JUL 19", city: "TORONTO, ON", venue: "BUDWEISER STAGE" },
    { date: "JUL 22", city: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
    { date: "JUL 29", city: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
    { date: "AUG 2", city: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
    { date: "AUG 7", city: "CONCORD, CA", venue: "CONCORD PAVILION" }
];

function TourList() {
    return (
        <>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>TOURS</h1>
            <Table striped bordered hover>
                <tbody>
                    {tourDates.map((tour, index) => {
                        return (
                            <TourItem
                                key={index}
                                date={tour.date}
                                city={tour.city}
                                venue={tour.venue}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default TourList;
