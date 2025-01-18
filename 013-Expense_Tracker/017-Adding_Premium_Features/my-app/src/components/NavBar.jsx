import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import classes from './NavBar.module.css';

const NavBar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        navigate("/auth");
    };

    return (
        <nav className={classes.navigation}>
            <ul className={classes.navLinks}>
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

                {isAuthenticated && (
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

                {!isAuthenticated && (
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

                {isAuthenticated && (
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
