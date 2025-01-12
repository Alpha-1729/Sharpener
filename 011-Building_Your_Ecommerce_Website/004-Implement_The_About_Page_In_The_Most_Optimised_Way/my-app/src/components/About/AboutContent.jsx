import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { FaYoutube, FaSpotify, FaFacebook } from "react-icons/fa";

function AboutContent() {
    return (
        <Fragment>
            <h1 style={{ backgroundColor: "grey", padding: "10px", color: "white", textAlign: "center" }}>
                The Generics
            </h1>
            <h3 style={{ textAlign: "center", margin: "20px 0" }}>ABOUT</h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px" }}>
                <img
                    src="https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=2048x2048&w=is&k=20&c=PwxCBUPI8AK2ukQRtte2BPtJ1FpnhCpZL-xlF2YTfoM="
                    alt="Concert"
                    style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        marginRight: "20px"
                    }}
                />
                <p style={{ maxWidth: "600px", textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet facilis culpa quas nostrum omnis.
                    Eaque nisi cumque eveniet saepe quidem consequuntur, aliquam repellat ex voluptatum temporibus!
                    Tempora, obcaecati maxime qui iure laboriosam non temporibus, dolorum commodi adipisci reiciendis porro.
                    Quae ab cum, iste veritatis fuga explicabo eaque neque sequi dolorem nisi voluptate nam et ipsum blanditiis
                    soluta officiis saepe rem. Dignissimos voluptate consequatur, tempore nam harum ab. Autem reiciendis repellendus
                    eaque magni vero ipsum. Nesciunt, qui obcaecati! Dolorem sequi alias maiores quam quidem in itaque ipsum repudiandae
                    voluptate ea similique et accusantium quibusdam quisquam rem aliquid dignissimos temporibus, laboriosam voluptas.
                </p>
            </div>

            <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px 0" }}>
                <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Left Section - Heading */}
                    <h4 style={{ margin: 0 }}>The Generics</h4>

                    {/* Right Section - Social Icons */}
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
        </Fragment>
    );
}

export default AboutContent;
