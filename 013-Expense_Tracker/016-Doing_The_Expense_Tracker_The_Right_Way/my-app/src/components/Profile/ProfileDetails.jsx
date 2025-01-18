import React, { useContext, useState, useEffect } from "react";
import FirebaseAuthServices from "../../services/firebase/firebaseAuthServices"; // Import the FirebaseAuthServices utility
import styles from "./ProfileDetails.module.css";
import { useSelector } from "react-redux";

function ProfileDetails() {
    const token = useSelector(state => state.auth.token);

    const [userData, setUserData] = useState({
        displayName: "",
        photoUrl: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Fetch user details using FirebaseAuthServices
     */
    const fetchUserData = async () => {
        try {
            const userDetails = await FirebaseAuthServices.getUserDetails(token);
            if (userDetails.error) {
                throw new Error(userDetails.error);
            }
            setUserData(userDetails.response);
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            setErrorMessage(error.message);
        }
    };

    /**
     * Handle input changes for editing user data
     */
    const handleChange = ({ target: { name, value } }) => {
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Update user details using FirebaseAuthServices
     */
    const handleUpdate = async () => {
        try {
            const { displayName, photoUrl } = userData;
            const updateResponse = await FirebaseAuthServices.updateUserDetails(
                token,
                displayName,
                photoUrl
            );

            if (updateResponse.error) {
                throw new Error(updateResponse.error);
            }

            setIsEditing(false);
            fetchUserData(); // Refresh updated data
        } catch (error) {
            console.error("Error updating user details:", error.message);
            setErrorMessage(error.message);
        }
    };

    /**
     * Handle cancel action
     */
    const handleCancel = () => {
        setIsEditing(false);
        fetchUserData(); // Revert to original data
    };

    /**
     * Fetch user data when the component mounts or the token changes
     */
    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Profile Details</h1>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="fullName">Full Name</label>
                {isEditing ? (
                    <input
                        type="text"
                        id="fullName"
                        name="displayName"
                        value={userData.displayName || ""}
                        onChange={handleChange}
                        className={styles.input}
                    />
                ) : (
                    <input
                        type="text"
                        id="fullName"
                        name="displayName"
                        value={userData.displayName || ""}
                        readOnly
                        className={`${styles.input} ${styles.readOnly}`}
                    />
                )}
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="photoUrl">Profile Photo URL</label>
                {isEditing ? (
                    <input
                        type="text"
                        id="photoUrl"
                        name="photoUrl"
                        value={userData.photoUrl || ""}
                        onChange={handleChange}
                        className={styles.input}
                    />
                ) : (
                    <input
                        type="text"
                        id="photoUrl"
                        name="photoUrl"
                        value={userData.photoUrl || ""}
                        readOnly
                        className={`${styles.input} ${styles.readOnly}`}
                    />
                )}
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={userData.email || ""}
                    readOnly
                    className={`${styles.input} ${styles.readOnly}`}
                />
            </div>
            <div className={styles.buttonContainer}>
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className={`${styles.button} ${styles.updateButton}`}
                        >
                            Update
                        </button>
                        <button
                            onClick={handleCancel}
                            className={`${styles.button} ${styles.cancelButton}`}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className={`${styles.button} ${styles.editButton}`}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileDetails;
