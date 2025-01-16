import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css'; // Importing CSS module

const NavBar = () => {
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
            </ul>
        </nav>
    );
};

export default NavBar;
