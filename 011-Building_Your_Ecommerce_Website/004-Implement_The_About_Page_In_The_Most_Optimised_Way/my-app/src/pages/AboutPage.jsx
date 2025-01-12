import React from "react";
import StoreNavBar from "../components/StoreNavBar";
import AboutContent from "../components/About/AboutContent";
function AboutPage() {
    return (
        <>
            <StoreNavBar handleCartShow={() => { }} />
            <AboutContent></AboutContent>
        </>
    );

}


export default AboutPage;