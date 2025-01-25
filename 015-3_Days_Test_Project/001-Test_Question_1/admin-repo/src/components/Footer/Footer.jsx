import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    {/* Logo Section */}
                    <Col md={4} className="mb-3">
                        <h4>TravelBuddy</h4>
                        <p>Explore your perfect getaway with us!</p>
                    </Col>

                    {/* Links Section */}
                    <Col md={4} className="mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/about" className={styles.link}>About Us</a>
                            </li>
                            <li>
                                <a href="/contact" className={styles.link}>Contact</a>
                            </li>
                            <li>
                                <a href="/privacy" className={styles.link}>Privacy Policy</a>
                            </li>
                        </ul>
                    </Col>

                    {/* Social Media and Copyright */}
                    <Col md={4} className="text-md-end">
                        <p>&copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
                        <p>Follow us on:</p>
                        <div className={styles.socialLinks}>
                            <a href="#" aria-label="Facebook">
                                <i className="bi bi-facebook"></i> Facebook
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="bi bi-instagram"></i> Instagram
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
