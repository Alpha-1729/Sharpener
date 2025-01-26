import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../store/Auth/authSlice";
import styles from "./NavBar.module.css";

function NavBar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/login');
    };

    const handleRedirect = (path) => navigate(path);

    return (
        <nav className={styles.navBar}>
            <div className={styles.brand} onClick={() => handleRedirect("/home")}>
                Admin
            </div>
            <div className={styles.links}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Home
                </NavLink>

                {isAuthenticated &&
                    <>
                        <NavLink
                            to="/category"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            Category
                        </NavLink>

                        <NavLink
                            to="/listing"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            Listings
                        </NavLink>

                        <NavLink
                            to="/booking"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            Bookings
                        </NavLink>
                    </>
                }

                {!isAuthenticated && (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Login
                    </NavLink>
                )}
            </div>

            {isAuthenticated && (
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
}

export default NavBar;
