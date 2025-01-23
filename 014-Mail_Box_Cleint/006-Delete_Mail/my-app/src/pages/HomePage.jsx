import React from "react";
import { Fragment } from "react";
import HomePageHeading from "../components/Home/HomePageHeading";
import ComposeEmail from '../components/Home/ComposeEmail';
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.css';  // Assuming the styles for HomePage

function HomePage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Fragment>
            {isAuthenticated && <HomePageHeading />}
            {isAuthenticated && <ComposeEmail />}
            <div className={styles.layout}>
                {isAuthenticated && <SideBar />}
                <div className={styles.contentArea}>
                    <Outlet />
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;
