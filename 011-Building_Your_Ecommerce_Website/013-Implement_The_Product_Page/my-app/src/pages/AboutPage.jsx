import React from "react";
import StoreNavBar from "../components/StoreNavBar";
import AboutContent from "../components/About/AboutContent";
import GenericsHeader from "../components/GenericsHeader";
function AboutPage() {
    return (
        <>
            <StoreNavBar handleCartShow={() => { }} />
            <GenericsHeader />
            <AboutContent></AboutContent>
        </>
    );

}


export default AboutPage;