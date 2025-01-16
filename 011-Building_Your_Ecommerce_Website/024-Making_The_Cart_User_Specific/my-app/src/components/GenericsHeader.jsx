import React from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { Fragment } from "react";

function GenericsHeader() {
    const location = useLocation();

    // Check if the current page is the home page
    const isHomePage = location.pathname === "/";

    return (
        <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
            <h1 style={{ color: "white", padding: "10px", fontSize: "100px", fontWeight: "bold" }}>
                The Generics
            </h1>



            {isHomePage && (
                <Fragment>
                    <Button variant="secondary" style={{ display: "block", margin: "10px auto", fontSize: '30px', color: 'white' }}>
                        Get our Latest Album
                    </Button>
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"
                    }}>
                        <div style={{
                            width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "lightblue",
                            display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                        }}>
                            <i className="fa fa-play" style={{ fontSize: "30px", color: "white" }}></i>
                        </div>
                    </div>
                </Fragment>

            )}
        </div>
    );
}

export default GenericsHeader;
