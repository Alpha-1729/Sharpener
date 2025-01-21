import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/login');
    };

    return (
        <nav className={styles.navBar}>
            <div className={styles.brand} onClick={() => navigate("/home")}>
                Mail Box
            </div>
            <div className={styles.links}>
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Home
                </NavLink>

                {!isAuthenticated &&
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Login
                    </NavLink>
                }

                {isAuthenticated &&
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                }
            </div>
        </nav >
    );
}

export default NavBar;
