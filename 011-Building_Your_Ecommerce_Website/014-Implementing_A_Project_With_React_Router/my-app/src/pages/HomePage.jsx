import React from "react";
import StoreNavBar from "../components/StoreNavBar";
import FooterContent from '../components/Footer/FooterContent';
import TourList from "../components/TourList";
import GenericsHeader from "../components/GenericsHeader";

function HomePage() {
    return (
        <>
            <StoreNavBar handleCartShow={() => { }} />
            <GenericsHeader />
            <TourList />
            <FooterContent />
        </>
    );

}


export default HomePage;