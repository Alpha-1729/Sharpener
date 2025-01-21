import React from "react";
import { Fragment } from "react";
import HomePageHeading from "../components/Home/HomePageHeading";
import { useSelector } from "react-redux";

function HomePage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <Fragment>
            {isAuthenticated && <HomePageHeading />}
        </Fragment>
    );

}


export default HomePage;