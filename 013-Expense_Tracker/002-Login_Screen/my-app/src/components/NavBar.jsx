import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css'; // Importing CSS module
import AuthContext from '../store/auth-context';

const NavBar = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn);

    const logoutHandler = () => {
        authCtx.logout(); // Call logout method from AuthContext
    };

    return (
        <nav className={classes.navigation}>
            <ul className={classes.navLinks}>
                <li>
                    <NavLink
                        to="/"
                        exact
                        className={({ isActive }) =>
                            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
                        }
                    >
                        Home
                    </NavLink>
                </li>
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
                {isLoggedIn && (
                    <li>
                        <button
                            className={classes.logoutButton} // Add styling for button
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
