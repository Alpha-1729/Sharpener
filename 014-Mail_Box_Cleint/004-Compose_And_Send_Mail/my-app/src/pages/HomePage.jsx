import React from "react";
import { Fragment } from "react";
import HomePageHeading from "../components/Home/HomePageHeading";
import ComposeEmail from '../components/Home/ComposeEmail';
import { useSelector } from "react-redux";

function HomePage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <Fragment>
            {isAuthenticated && <HomePageHeading />}
            {isAuthenticated && <ComposeEmail />}

        </Fragment>
    );

}


export default HomePage;