import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css"; // Importing the module.css file
import { useSelector } from "react-redux";

const SideBar = () => {
    const unReadCount = useSelector(state => state.email.unreadCount);
    return (
        <div className={styles.sidebar}>
            <nav className={styles.nav}>
                <NavLink
                    to="/inbox"
                    className={({ isActive }) =>
                        isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                    }
                >
                    {`Inbox (${unReadCount})`}
                </NavLink>
                <NavLink
                    to="/outbox"
                    className={({ isActive }) =>
                        isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                    }
                >
                    Outbox
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;
