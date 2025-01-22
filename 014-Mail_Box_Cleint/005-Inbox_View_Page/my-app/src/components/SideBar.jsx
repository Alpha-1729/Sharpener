import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css"; // Importing the module.css file

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <nav className={styles.nav}>
                <NavLink
                    to="/inbox"
                    className={({ isActive }) =>
                        isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                    }
                >
                    Inbox
                </NavLink>
                <NavLink
                    to="/sent"
                    className={({ isActive }) =>
                        isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                    }
                >
                    Sent
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;
