import React from "react";
import { Container } from "react-bootstrap";
import { FaYoutube, FaSpotify, FaFacebook } from "react-icons/fa";

function FooterContent() {
    return (
        <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px 0" }}>
            <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0 }}>The Generics</h4>

                <div style={{ display: "flex", gap: "15px" }}>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#fff", fontSize: "24px" }}
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://www.spotify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#fff", fontSize: "24px" }}
                        aria-label="Spotify"
                    >
                        <FaSpotify />
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#fff", fontSize: "24px" }}
                        aria-label="Facebook"
                    >
                        <FaFacebook />
                    </a>
                </div>
            </Container>
        </footer>
    );
};


export default FooterContent;