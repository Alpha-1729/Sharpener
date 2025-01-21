import React from "react";
import styles from "./HomePageHeading.module.css";

function HomePageHeading() {
    return (
        <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Welcome to Your Mailbox</h1>
        </div>
    );
}

export default HomePageHeading;
