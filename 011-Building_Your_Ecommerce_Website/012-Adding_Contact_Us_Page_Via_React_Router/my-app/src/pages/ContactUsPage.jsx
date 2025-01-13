import React from "react";
import StoreNavBar from "../components/StoreNavBar";
import ContactForm from "../components/ContactForm";
import FooterContent from "../components/Footer/FooterContent";

const ContactUsPage = () => {
    return (
        <>
            <StoreNavBar handleCartShow={() => { }} />
            <ContactForm />
            <FooterContent />
        </>
    );
}

export default ContactUsPage;