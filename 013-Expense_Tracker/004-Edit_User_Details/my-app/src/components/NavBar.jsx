import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './NavBar.module.css'; // Importing CSS module
import AuthContext from '../store/auth-context';

const NavBar = () => {
    const authCtx = useContext(AuthContext); // Use AuthContext to get authentication state
    const isLoggedIn = authCtx.isLoggedIn; // Check if the user is logged in
    const navigate = useNavigate();

    // Logout handler to clear authentication and navigate to login page
    const logoutHandler = () => {
        authCtx.logout(); // Clear authentication state
        navigate("/auth"); // Redirect to the authentication page
    };

    return (
        <nav className={classes.navigation}>
            <ul className={classes.navLinks}>
                {/* Home Link */}
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {isLoggedIn && (
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                            }
                        >
                            Profile
                        </NavLink>
                    </li>
                )}

                {/* About Link */}
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                        }
                    >
                        About
                    </NavLink>
                </li>

                {/* Contact Link */}
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                        }
                    >
                        Contact
                    </NavLink>
                </li>

                {/* Login Link: Shown only if logged out */}
                {!isLoggedIn && (
                    <li>
                        <NavLink
                            to="/auth"
                            className={({ isActive }) =>
                                isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                )}

                {/* Logout Button: Shown only if logged in */}
                {isLoggedIn && (
                    <li>
                        <button
                            className={classes.logoutButton}
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
