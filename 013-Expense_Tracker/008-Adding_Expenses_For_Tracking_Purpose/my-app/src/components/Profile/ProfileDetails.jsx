import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import firebaseConfig from "../../FirebaseConfig";
import styles from "./ProfileDetails.module.css"; // Importing the CSS module

function ProfileDetails() {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token; // Firebase ID token from AuthContext
    const API_KEY = firebaseConfig.apiKey;

    const [userData, setUserData] = useState({
        displayName: "",
        photoUrl: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user data from Firebase based on the ID token
    const getUserData = async () => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ idToken: token }), // Ensure correct token name
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = await response.json();
            if (data.users && data.users.length > 0) {
                const user = data.users[0]; // We are dealing with a single user here
                setUserData({
                    displayName: user.displayName || "",
                    photoUrl: user.photoUrl || ""
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Update user data in Firebase
    const handleUpdate = async () => {
        const updatedData = {
            displayName: userData.displayName,
            photoUrl: userData.photoUrl
        };

        // Make the API call to update the user data in Firebase
        try {
            await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
                        displayName: updatedData.displayName,
                        photoUrl: updatedData.photoUrl
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIsEditing(false);
            getUserData(); // Re-fetch updated data
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        setIsEditing(false);
        getUserData(); // Revert to original user data
    };

    useEffect(() => {
        if (token) {
            getUserData();
        }
    }, [token]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Contact Details</h1>
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
            <div className={styles.buttonContainer}>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate} className={`${styles.button} ${styles.updateButton}`}>Update</button>
                        <button onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className={`${styles.button} ${styles.updateButton}`}>Edit</button>
                )}
            </div>
        </div>
    );
}

export default ProfileDetails;
